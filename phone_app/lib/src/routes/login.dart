import 'package:flutter/material.dart';
import 'package:smartsapp/src/widgets/dark_mode_toggler.dart';

class Login extends StatefulWidget {
  static const routeName = "/login";

  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final GlobalKey<FormState> formKey = GlobalKey();
  bool isEmailValid = true;
  bool isPasswordValid = true;
  Map<String, String> authData = {
    'email': '',
    'password': '',
  };

  @override
  Widget build(BuildContext context) {
    final deviceSize = MediaQuery.of(context).size;
    final themeData = Theme.of(context);
    final navigator = Navigator.of(context);
    final node = FocusScope.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text("LOGIN"),
      ),
      body: Container(
        color: themeData.backgroundColor,
        height: deviceSize.height,
        child: Form(
          key: formKey,
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(
              horizontal: 16,
              vertical: 8,
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                createEmailField(themeData, node),
                createPasswordField(themeData, node),
                SizedBox(
                  height: 4,
                ),
                Row(
                  children: [
                    Text("Not a member yet?"),
                    FlatButton(
                      padding: const EdgeInsets.all(0),
                      onPressed: () {
                        navigator.pushReplacementNamed("/register");
                      },
                      child: Text("Register"),
                    ),
                  ],
                ),
                RaisedButton(
                  onPressed: submit,
                  child: Text(
                    "Login",
                    style: TextStyle(
                      color: Colors.white,
                    ),
                  ),
                ),
                DarkModeToggler(),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget createEmailField(ThemeData themeData, FocusNode node) {
    return TextFormField(
      decoration: InputDecoration(
          labelText: 'E-Mail',
          hintText: 'Enter your email',
          labelStyle: TextStyle(
              color: isEmailValid
                  ? themeData.primaryColor
                  : themeData.errorColor)),
      keyboardType: TextInputType.emailAddress,
      validator: (email) {
        if (email.isEmpty ||
            !RegExp(r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+")
                .hasMatch(email)) {
          setState(() {
            isEmailValid = false;
          });
          return 'Invalid email';
        }
        setState(() {
          isEmailValid = true;
        });
        return null;
      },
      onEditingComplete: () => node.nextFocus(),
      onSaved: (value) {
        authData['email'] = value;
      },
    );
  }

  Widget createPasswordField(ThemeData themeData, FocusNode node) {
    return TextFormField(
      decoration: InputDecoration(
          labelText: 'Password',
          hintText: 'Enter your password',
          labelStyle: TextStyle(
              color: isPasswordValid
                  ? themeData.primaryColor
                  : themeData.errorColor)),
      obscureText: true,
      validator: (password) {
        if (password.length < 6) {
          setState(() {
            isPasswordValid = false;
          });
          return 'Password must contain at least 6 characters';
        }
        setState(() {
          isPasswordValid = true;
        });
        return null;
      },
      onEditingComplete: () => node.unfocus(),
      onSaved: (value) {
        authData['password'] = value;
      },
    );
  }

  Future<void> submit() async {
    if (!formKey.currentState.validate()) {
      return;
    }
    formKey.currentState.save();
    print(authData);
  }
}
