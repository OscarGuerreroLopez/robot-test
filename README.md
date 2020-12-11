# Robots-test

## Description:

This test is based on the test.md you can find on this repo.

I create a Post route as:

/mars/instructions

Where you need to enter the instructions like:
{
"instructions": "5 3\n1 1 E\nRFRFRFRF\n\n3 2 N\nFRRFLLFFRRFLL\n\n0 3 W\nLLFFFLFLFL"
}

This should give you the expected result, you can use postman, for example, to test locally:

```bash
curl --location --request POST 'http://localhost:8007/mars/instructions' \
--header 'Content-Type: application/json' \
--data-raw '{
"instructions": "5 3\n1 1 E\nRFRFRFRF\n\n3 2 N\nFRRFLLFFRRFLL\n\n0 3 W\nLLFFFLFLFL"
}'
```

Also, since the instructions mentioned that it would be nice to create another endpoint, I created one that returns the number of lost robots and where they got lost. Something simple.

Since I just had a couple of hours available, I started the project with a simple boilerplate that I have (yes it is mine), where you log each request that comes in. This is done by adding the logs to a file, but obviously this is not ideal, in a micro service structure I would log into elastic search and use kibana to see the logs, for example. Also errors or any other relevant information would be log before throwing or crashing.

I also use a ratelimiter, so if you go crazy making a bunch of consecutive requests you will get locked a bit so you can calm down.

What else?, I included some basic test with Jest, I wish I would have had more time to create more test suits but… Hope that is enough for you to test me.

If you wonder about how I name variables, normally I use camelcase , Capitalised camelcase for exported variables and lowercase for internal variables. Obviously I can adapt to any other practices that you implement, that is just the way I am used to.

I included some comments in the code, again this is just for the test, if your organisation prefers no comments and have all of that explained on a document I will adapt.

I also use some validators to check the payload that is coming, this is also very basic, in a real app the validation would be stricter. I also check that the env variables are present, some would default if not present, some will make the app crash if not present.

The way I've structured the folders and files is not very elaborated, I just tried to keep the routes, handlers, middleware and domain in separate folders, again I could adapt to any other rules that you might have.

Also I took a functional approach, I am used to developing micro services and I try to avoid classes as much as possible, but I have no problem with object oriented approaches if that’s how you do it. Either way works for me.

To wrap up, I tried to make the code as extensible as possible, if new functionalities, like new instructions, come along we just need to change one file for example.

if you have any questions feel free to drop me an email to oscar.computer.guy@gmail.com

## Run it

### Run local

Clone it, create a .env file folowing the .example.env, run redis locally, npm install and:

```bash
npm run start:tsnode
```

or

```bash
mpm start
```

### Run with docker:

Clone it, create a .env file folowing the .example.docker.env, and:

```bash
docker-compose build
docker-compose up
```

I mapped port 8007 so if you execute it on your local machine just post http://localhost:8007/mars/instructions

```bash
curl --location --request POST 'http://localhost:8007/mars/instructions' \
--header 'Content-Type: application/json' \
--data-raw '{
"instructions": "5 3\n1 1 E\nRFRFRFRF\n\n3 2 N\nFRRFLLFFRRFLL\n\n0 3 W\nLLFFFLFLFL"
}'
```
