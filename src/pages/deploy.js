import React from 'react';
import styles from './styles.module.scss';
import { Auth, DeployButton } from 'components/molecules'
import { Footer, LayoutNav } from 'components/organisms';
import { MainLayout } from 'components/layouts'

class Deploy extends React.Component {
    render() {
		let needsAuth = true;

		if (process.env.NODE_ENV === 'development') {
			needsAuth = false;
		}

        return (
			<MainLayout className="deploy-page">
				<Auth needsAuth={needsAuth}>
					<section className={`${styles.container}`}>
						<ol>
							<li>
								<h2>Write your documentation <a href="https://drive.google.com/drive/u/1/folders/1M0L3J8z5MTjppfs7uJrahVTDti1TZewh">here</a>
								</h2>
							</li>
							<li>
								<h2>Push this button to deploy changes to staging site:
									<DeployButton deployHook={`${process.env.GATSBY_UAT_DEPLOY_HOOK}`}>
										UAT
									</DeployButton>
								</h2>
							</li>
							<li>
								<h2>Preview your changes <a href="https://uat--lfrism-doc.netlify.com/">here</a>
								</h2>
							</li>
							<li>
								<h2>Once you're happy with you're changes deploy to production by pushing this button:
									<DeployButton deployHook={`${process.env.GATSBY_PRD_DEPLOY_HOOK}`}>
										PROD
									</DeployButton>
								(it'll be there in a few minutes)
								</h2>
							</li>
						</ol>
					</section>
				</Auth>
			</MainLayout>
    )};
}

export default Deploy;
