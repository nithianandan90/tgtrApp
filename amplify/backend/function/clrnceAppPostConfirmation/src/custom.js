/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

const env = process.env.ENV;
const AppsyncID = process.env.API_CLRNCEAPP_GRAPHQLAPIIDOUTPUT;

const TableName = `User-${AppsyncID}-${env}`;

const userExists = async id => {
  const params = {
    TableName,
    Key: id,
  };

  try {
    const response = await docClient.get(params).promise();

    return !!response?.Item;
  } catch (e) {
    return false;
  }
};
const saveUser = async user => {
  const date = new Date();
  console.log('lambda function triggered');
  const timestamp = date.getTime();
  const dateStr = date.toISOString();

  const Item = {
    ...user,
    __typename: 'User',
    createdAt: dateStr,
    updatedAt: dateStr,
    _lastChangedAt: timestamp,
    _version: 1,
  };

  const params = {
    TableName,
    Item,
  };

  try {
    await docClient.put(params).promise();
  } catch (e) {
    console.log(e);
  }
};

exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger

  console.log(
    'lambda function working and is updated',
    !event?.request?.userAttributes,
  );

  if (!event?.request?.userAttributes) {
    console.log('no user data available');
    return;
  }

  const {sub, name, email} = event.request.userAttributes;

  const newUser = {
    id: sub,
    name: name,
  };

  //check if the user already exists

  if (!(await userExists(newUser.id))) {
    await saveUser(newUser);
    console.log(`User ${newUser.id} has been saved to the database`);
  } else {
    console.log(`User ${newUser.id} already exists`);
  }
  return event;
};
