# LightTube Assesment

LightTube is a full stack app made for an assesment part of the Nest program.

The app allows you to create an account, once you are logged in you can search for youtube videos and add them to your favorites for watching later.

## Usage

Clone project from github.

Create config.env file in the root off the folder containing the project, copy the content of example.config.env to this file and uncomment the variables.

For the YOUTUBE_KEY variable you will need to:

1. Go to <https://console.developers.google.com/>.
2. Create an account if you need one.
3. Click on "Enable APIS and Services" on the top bar.
4. Search for "YouTube Data API v3".
5. Enable the API.
6. Go back to <https://console.developers.google.com/>.
7. Click on credentials on the side bar.
8. Select "Create credentials" then API key.
9. Copy this key and paste it in the YOUTUBE_KEY field in the config.env example.

You will need to install docker and docker-compose, you can check the documentation at <https://docs.docker.com/get-docker/>.

Once you have the environment variables set up, you need to go with the terminal to the root of the project and execute:
`docker-compose up`

Once you run the docker command you can check if the containers are up with
`docker ps`

If they are all up you are almost there.

The last step is to go to <http://localhost:3000/> and sign up to use the app, once you have an user you can use sign in to login yourself.

## Known bugs and issues

Given the time constraints required by the assesment some bugs and issues exist, I would love to fix them if offered the oportunity.

List of known issues and bugs:

1. Next page and previous page buttons appear even if nothing as been searched yet, same with previous page button not being disabled on the first page.
2. Next page button needs to be clicked twice to work the first time you search.
3. If you click on add favorites once you are not in the first page the search will refresh, sending you to the first page.
4. Styling for sign in and sign up page are lacking.
5. React components need to be more nested and reusable, specially in the sign up and sign in pages.
6. Youtube requests need to validate youtube video id and should be cleaned up to only request the needed information.
7. Messages in the client to inform users about errors.

## License
[MIT](https://choosealicense.com/licenses/mit/)