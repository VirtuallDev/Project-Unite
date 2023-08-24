from typing import Annotated, Union

from fastapi import FastAPI, File, UploadFile, Response, Request

app = FastAPI()

@app.get("/")
def root():
    return Response("Not Found", 404)

@app.post('/media')
async def upload_media(request: Request):
    print(request.session)
    file_as_bytes = await request.body()
    print(len(file_as_bytes))
    