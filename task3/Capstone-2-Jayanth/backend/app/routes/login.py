from fastapi import APIRouter, HTTPException, Depends, Response, Cookie
from fastapi.security import  HTTPBearer,  HTTPAuthorizationCredentials
from pydantic import BaseModel
from pwdlib import PasswordHash
import jwt
from jwt.exceptions import InvalidTokenError
from datetime import datetime, timedelta, timezone
import psycopg as pg
from app.database.connection import get_connection
from dotenv import load_dotenv
import os
load_dotenv()

security = HTTPBearer()


conn = get_connection()

# conn = pg.connect(
#     dbname='test',
#     host='localhost',
#     password='admin@123',
#     user='jayanth',
#     port =5433
# )

router = APIRouter(prefix='', tags=['Login'])

passwordhash = PasswordHash.recommended()

SECRET_KEY=os.getenv('SECRET_KEY')
ALGORITHM =os.getenv('ALGORITHM')

EXPIRE=120




class Login(BaseModel):
    username:str
    password:str



def create_token(username:str, role:str):
    expire = datetime.now(timezone.utc) + timedelta(minutes=EXPIRE)

    payload={
        'sub':username,
        'role':role,
        'exp':expire
    }


    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

    return token


def get_admin_auth(cred:HTTPAuthorizationCredentials = Depends(security)):
    token = cred.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, ALGORITHM)

        username = payload.get('sub')
        role = payload.get('role')


        if username is None or role is None or role != 'admin':
            raise HTTPException(
                status_code=401,
                detail="Invalid Authentication token"
            )
        return {
            'username': username,
            'role': role
        }
    except InvalidTokenError:
        raise HTTPException(
            status_code=401,
            detail = 'Invalid or Expired token'
        )


def get_current_user(
    access_token:str | None = Cookie(default=None)
):
    if not access_token:
        raise HTTPException(status_code=401, detail='No token Not authenticated')
    
    header = jwt.get_unverified_header(access_token)

    print("JWT HEADER:", header)
    print("EXPECTED ALGO",ALGORITHM)
    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get('sub')
        role = payload.get('role')
        if not username:
            raise HTTPException(status_code=401, detail="Invalid Token")
        if not role or role != "admin":
            raise HTTPException(status_code=403, detail='Admin aceess is required')
        
        return {"username":username, 'role':role}
    except InvalidTokenError as e:
        print("JWT ERROR:", type(e).__name__, str(e))

        raise HTTPException(
            status_code=401,
            detail=f"Invalid token")



@router.post('/login')
def login(cred:Login, response:Response):
    username = cred.username
    password = cred.password

    cur = conn.cursor()

    cur.execute('select password, role from users where username = %s', (username,))

    row = cur.fetchone()
    cur.close()

    if row is None:
        raise HTTPException(
            status_code=401,
            detail = 'Invalid creds'
        )
    st_pass = row[0]
    role = row[1]

   


    if not passwordhash.verify(password, st_pass):
        print(st_pass)
        raise HTTPException(
            status_code=401,
            detail='Invalid cred'
        )

    token = create_token(username=username, role=role)

    response.set_cookie(
        key='access_token',
        value=token,
        httponly=True,
        secure=False,
        samesite='lax',
        max_age=60*EXPIRE,
        path="/"
    )

    return {
        "success": True,
        "message": "Successfully logged in",
        "role": role,
        "username":username
    }



@router.get('/auth/me')
def get_me(cred:str = Depends(get_current_user)):
    return {
    "authenticated": True,
}




@router.post("/logout")
def logout(response: Response):

    response.delete_cookie(
        key="access_token",
        path="/login"
    )

    return {
        "message": "Logged out successfully"
    }