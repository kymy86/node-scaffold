#!/bin/bash

TEST_USER="${MONGO_DB_USER}-test"
TEST_PASS="${MONGO_DB_PASS}-test"
TEST_DB="${MONGO_DATABASE}_test"

#creating production database


echo "=> Creating an ${MONGO_INITDB_ROOT_USERNAME} user with a ${MONGO_INITDB_ROOT_PASSWORD} password in MongoDB"

mongo admin -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD <<EOF
use $MONGO_DATABASE
db.createUser({user: '$MONGO_DB_USER', pwd: '$MONGO_DB_PASS', roles:[{role:'dbOwner', db:'$MONGO_DATABASE'}]})
EOF

#creating test database

echo "=> Creating an ${TEST_USER} user with a ${TEST_PASS} password in MongoDB for testing database"

mongo admin -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD <<EOF
use $TEST_DB
db.createUser({user: '$TEST_USER', pwd: '$TEST_PASS', roles:[{role:'dbOwner', db:'$TEST_DB'}]})
EOF

