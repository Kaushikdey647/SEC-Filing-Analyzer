from pymongo import MongoClient
from dotenv import load_dotenv
import datetime
import os

load_dotenv()
MONGODB_URI = os.environ['MONGODB_URI']

client = MongoClient(MONGODB_URI)
print(client)
