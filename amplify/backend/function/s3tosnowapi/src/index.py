import json

import awsgi
from flask_cors import CORS
from flask import Flask, jsonify, request

import DataLoad_1310_Snowflake as dl

app = Flask(__name__)
CORS(app)

BASE_ROUTE = "/s3tosnowflake"

@app.route(BASE_ROUTE, methods=['GET'])
def list_songs():
    return jsonify(message=dl.cli("file"))

def handler(event, context):
    return awsgi.response(app, event, context)

"""
def handler(event, context):
  print('received event:')
  print(event)
  
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps('Hello from your new Amplify Python lambda!')
  }
"""