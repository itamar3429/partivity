# auth setup

- local.strategy:<br>
  This will log in the user and verify him.<br>
  By putting the user info in the request and adding cookies for session.
  <br><br>
- auth.serialize:<br>
  This class will send cookies to the client with the client id and expiration date encrypted.<br>
  The serialize function, is responsible for deciding what user info is send with the cookies.<br>
  The function will be called before each time a user receives a response.<br>
  the deserialize function will happen each time the client makes a request.<br>
  It'll receive the user id from the cookies and will validate the user from the db.<br>
  If the user exist it'll return the user otherwise return null.
  <br><br>
- guard.local:<br>
  This class is injectable and can be injected in a useGuards decorator before a login request.<br>
  the class will initiate the local.strategy with the username and password from the body.<br>
  it'll insert the new user (if validated) to the request and continue to the login function.
  <br><br>
  ```ts
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req:express.Request){
  	req.user // => the validated user
  }
  ```
  <br>
- auth.guard:<br>
  these classes each validates whether a user is connected and has a required role ('admin'|'provider'|'client').<br>
  each class validates one role or more.<br>
  these class can be used inside a useGuard decorator before a specific endpoint or a controller.
  <br><br>
  ```ts
  	@UseGuards([Authenticate |& AuthenticateAdmin |& AuthenticateProvider])
  	@Post('protected/route')
  	protected(@Request() req:express.Request){
  		req.user // => the validated user
  	}
  ```
  <br>

for more information visit the nest js
[passport page](https://docs.nestjs.com/security/authentication#implementing-passport-strategies 'nest js authentication setup').
