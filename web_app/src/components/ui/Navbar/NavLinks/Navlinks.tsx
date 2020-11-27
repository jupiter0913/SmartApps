import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./navlinks.module.css";

interface IProps {
	user?: object;
	sidebarClose: () => void;
}

export default function Navlinks({ user, sidebarClose }: IProps) {
	return (
		<div className={`ml-auto my-auto ${styles.NavLinkHolder}`}>
			{user ? (
				<>
					<NavLink
						exact
						to="/"
						className={styles.NavLink}
						activeClassName={styles.NavLinkActive}
						onClick={sidebarClose}
					>
						Chats
						<span className={styles.Spacer} />
						<i className="fa fa-comments" aria-hidden="true" />
					</NavLink>
					<NavLink
						exact
						to="/settings"
						className={styles.NavLink}
						activeClassName={styles.NavLinkActive}
						onClick={sidebarClose}
					>
						Settings
						<span className={styles.Spacer} />
						<i className="fa fa-cogs" aria-hidden="true" />
					</NavLink>
					<NavLink
						exact
						to="/logout"
						className={styles.NavLink}
						activeClassName={styles.NavLinkActive}
						onClick={sidebarClose}
					>
						Log Out
						<span className={styles.Spacer} />
						<i className="fa fa-sign-out" aria-hidden="true" />
					</NavLink>
				</>
			) : (
				<>
					<NavLink
						exact
						to="/login"
						className={styles.NavLink}
						activeClassName={styles.NavLinkActive}
						onClick={sidebarClose}
					>
						Log In
						<span className={styles.Spacer} />
						<i className="fa fa-sign-in" aria-hidden="true" />
					</NavLink>
					<NavLink
						exact
						to="/register"
						className={styles.NavLink}
						activeClassName={styles.NavLinkActive}
						onClick={sidebarClose}
					>
						Register
						<span className={styles.Spacer} />
						<i className="fa fa-user-plus" aria-hidden="true" />
					</NavLink>
				</>
			)}
		</div>
	);
}
