import React from 'react';
import { Auth } from 'components/molecules'
import { LayoutNav, Sidebar, SimpleFooter} from 'components/organisms';
import { graphql } from 'gatsby';
import {Helmet} from 'react-helmet';

export default class Docs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navbarToggled: false
		}
    }

    docsNavbarToggleClick() {
        this.setState(prevState => ({
            navbarToggled: !prevState.navbarToggled
        }));
    }

    render() {
        const { data, location } = this.props;

        const { markdownRemark: { html, fields: {title, needsAuth}, excerpt, timeToRead } } = data;

        return (
            <div className="docs">
                <Auth needsAuth={needsAuth}>
                    <Helmet>
                        <title>{title}</title>
                        <meta name="description" content={excerpt} />
                        <meta name="og:description" content={excerpt} />
                        <meta name="twitter:description" content={excerpt} />
                        <meta name="og:title" content={title} />
                        <meta name="og:type" content="article" />
                        <meta name="twitter.label1" content="Reading time" />
                        <meta
                            name="twitter:data1"
                            content={`${timeToRead} min read`}
                        />
                    </Helmet>

                    <header>
                        <LayoutNav effect={true} static={true} sidebarHamburguerIcon={true} onNavbarToggleClick={this.docsNavbarToggleClick.bind(this)} />
                    </header>

                    <main className="content">
                        <Sidebar location={location} navbarToggled={this.state.navbarToggled} />
                        <div className="sidebar-offset">
                            <div className="clay-site-container container-fluid">
                                <div className="row">
                                    <div className="col-md-12">
                                        <article dangerouslySetInnerHTML={{__html: html}}>
                                        </article>
                                    </div>
                                </div>
                            </div>

                            <SimpleFooter editContentURL={process.env.EDIT_CONTENT_URL} issuesURL={process.env.ISSUES_URL} slug={this.props["*"]}/>
                        </div>
                    </main>
                </Auth>
            </div>
        );
    }
}

export const pageQuery = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            excerpt
            timeToRead
            fields {
                needsAuth
                title
            }
        }
    }
`;