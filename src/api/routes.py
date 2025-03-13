"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
import datetime

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup(): 

    email = request.json.get("email")
    password = request.json.get("password")

    if User.query.filter_by(email=email).first():
        return({
            "msg": "user already exist"
        }), 400
    
    hashed_password = generate_password_hash(password)
    new_user = User(email = email, password = hashed_password, is_active = True)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "user created succesfully"}), 201

@api.route('/login', methods=['POST'])       
def handleLogIn():

    email = request.json.get('email')
    password = request.json.get('password')

    user = User.query.filter_by(email = email).first()
    if user is None or not check_password_hash(user.password, password):
        return jsonify({"msg": "Invalid username or password"}), 401
    
    expiration = datetime.timedelta(days = 7)
    access_token = create_access_token(identity = user.email, expires_delta = expiration) #THIS!!!
    return jsonify({"token": access_token}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def privateRoute():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404
    
    return jsonify(logged_in_as = current_user), 200