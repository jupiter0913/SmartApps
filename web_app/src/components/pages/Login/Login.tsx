import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import AuthBackground from "../../ui/AuthBackground/AuthBackground";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import Loader from "../../ui/Loader/Loader";

import firebase from "../../../firebase/firebase";
import { IState } from "../../../shared/interfaces/Interfaces";
import * as actions from "../../../store/actions/actions";

import styles from "../../../shared/auth/auth.module.css";
import { connect } from "react-redux";

interface IProps {
	user?: firebase.User;
	isLoading: boolean;
	error: string;
	emailAuth: (email: string, password: string) => void;
}

function Login({ user, isLoading, error, emailAuth }: IProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmitHandler = async (event: React.FormEvent) => {
		event.preventDefault();
		emailAuth(email, password);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<AuthBackground>
			<div className={styles.Body}>
				<h1>LOGIN</h1>
				<hr className="mt-0" />
				<form className="py-2" onSubmit={onSubmitHandler}>
					<Input
						placeholder="Email"
						val={email}
						onChangeFunc={(email: string) => setEmail(email)}
					/>
					<Input
						placeholder="Password"
						val={password}
						onChangeFunc={(password: string) =>
							setPassword(password)
						}
						type="password"
					/>
					<p className={styles.RedirectText}>
						Not a member yet? <Link to="/register">Register</Link>
					</p>
					{error && (
						<>
							<div className={styles.ErrorText}>
								<i className="fa fa-exclamation-circle" />
								{error}
							</div>
						</>
					)}
					{isLoading ? <Loader /> : <Button>Login</Button>}
				</form>
			</div>
		</AuthBackground>
	);
}

const mapStateToProps = (state: IState) => ({
	user: state.auth.user,
	isLoading: state.auth.isLoading,
	error: state.auth.error,
});

const mapDispatchToProps = (dispatch: any) => ({
	emailAuth: (email: string, password: string) =>
		dispatch(actions.emailAuth(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);