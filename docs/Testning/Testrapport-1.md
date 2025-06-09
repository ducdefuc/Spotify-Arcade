Date for report: 2024-04-20

Tested system version/branch: main

Tests has been performed by the user/developer using manual testing.

# Test Cases

## Test case 1: User Authentication through Spotify. Based off of issue: [#6](https://gitlab.lnu.se/1dv613/student/dp222ky/projects/spotify-arcade/-/issues/6 "The application should offer a way for the user to authenticate.")

### Test case 1.1: Authentication successful for a first time user.

Verify that a new user can successfully authenticate using Spotify and browse the application further.

### Input

1. Navigate to the home page for the application.
2. Click on button "Log in with Spotify".
3. Enter a valid username/email and password in the presented fields.
4. Login in by pressing the presented "Login" button.
5. Accept the accessibility conditions by clicking "Accept" Button.

### Output

User is redirected to their profile page in the application. The system presents the user with the profile page content.

![image.png](../uploads/9499eb71c84f755d83fccfa561c44fa2/image.png)

### Test case 1.2: Authentication successful for an existing user.

Verify that an existing user can successfully authenticate using Spotify and browse the application further.

### Input

1. Navigate to the home page for the application.
2. Click on button "Log in with Spotify".
3. Enter a valid username/email and password in the presented fields.
4. Login in by pressing the presented "Login" button.

### Output

User is redirected to their profile page in the application. The system presents the user with the profile page content.

![image.png](../uploads/c1ca3c60c4a5f4f2ad4955cc9600cf3a/image.png)

### Test case 1.3: Authentication failed for a new user, the user declines the conditions

Verify that the system handles the scenario of a user not agreeing to the required terms to use the application.

### Input

1. Navigate to the home page for the application.
2. Click on button "Log in with Spotify".
3. Enter a valid username/email and password in the presented fields.
4. Login in by pressing the presented "Login" button.
5. Declines the request of agreeing to terms, by pressing the presented "Cancel" button.

### Output

User is redirected to an error page signaling that something went wrong, along with error code 400: Failed to get access token.

![image.png](../uploads/a5e749c8e1379421f2a5598231acc28a/image.png)

### Test case 1.4: Authentication failed for a user, the user did not successfully authenticate using the Spotify service and returns to the application.

### Input

1. Navigate to the home page for the application.
2. Click on button "Log in with Spotify".
3. Doesn't authenticate, and returns to the application.

### Output

User is presented the home page, with no other presented options other than "Log in to Spotify"

![image.png](../uploads/b1242b5b93e4861b749e6c7b6cef590d/image.png)

## Test case 2: Enforcing authenticated user to access application features. Based off of issue: [#8](https://gitlab.lnu.se/1dv613/student/dp222ky/projects/spotify-arcade/-/issues/8 "The user has to be authenticated to browse the application.")

### Test case 2.1: Accessing the Profile Page by an authenticated user.

Verify that an authenticated user can successfully access the profile page, which is a page that requires authentication to access.

### Input

1. Navigate to the home page for the application.
2. Click on the button "Go to profile".

### Output

User is redirected to their profile page in the application. The system presents the user with the profile page content.

![image.png](../uploads/7af385f7a3f61161b1d87e3a954c7e17/image.png)

### Test case 2.2: Access attempt to profile page without authentication.

Verify that a user can not navigate to the profile page without being authenticated.

### Input

1. Navigate to the home page for the application.

### Output

User is presented the home page, with no other presented options other than "Log in to Spotify"

![image.png](../uploads/7dc18726e4b6beec7592eb2d4aa8b61c/image.png)

### Test case 2.3: Direct URL access attempt to profile page without authentication.

Verify that the system handles attempts by unauthenticated users trying to access endpoints that require authentication directly via URL.

### Input

1. Navigate to the URL: [http://localhost:3030/spotify-arcade/user/profile](http://localhost:3030/spotify-arcade/user/profile)

### Output

User is redirected to an error page signaling that something went wrong, along with error code 401: Unauthorized.

![image.png](../uploads/a305faa28657524bea2e7f946203644a/image.png)

### Test case 2.4: Direct URL access attempt to profile page after having logged out.

Verify that the system handles attempts by logged out users trying to access endpoints that require authentication directly via URL.

### Input

1. Navigate to the home page for the application.
2. Click on button "Log in with Spotify".
3. Click on button "Log Out"
4. Navigate to the URL: [http://localhost:3030/spotify-arcade/user/profile](http://localhost:3030/spotify-arcade/user/profile)

### Output

User is redirected to an error page signaling that something went wrong, along with error code 401: Unauthorized.

![image.png](../uploads/0733a1825b36fef03ac283c34e7a0ea1/image.png)

# Comments

Overall the authentication system is working as intended. Improvements: Give the user more feedbacks on what is happening between clicks, maybe flash messages is an alternative.