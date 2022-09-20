# gotrue-to-appwrite
 A simple script that allows exporting users from GoTrue to Appwrite

## WARNING: Passwords under 6 characters cannot be imported into Appwrite.

## Usage
1. Clone the repository
2. Copy the `.env.example` file to `.env`
3. Update the `.env` file with your GoTrue and Appwrite credentials
4. Run `npm install`
5. Run `node index.js`
6. Check your Appwrite console to see the users
7. Import completed!

A `validateLogin.js` script is also included to validate the login credentials of the users. This is useful if you want to check if the users can login to your Appwrite project.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
