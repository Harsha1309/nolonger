import { Helmet } from "react-helmet";
interface IProps {
    title: string;
    keyword: string;
    description?: string;
    twittersite?: string;
    twittercreator?: string;
    twittertitle?: string;
    twitterimage?: string;
    twitterdescription?: string;
    ogtitle?: string;
    ogdescription?: string;
    ogurl?: string;
    ogimage?: string;
    fbappid?: string;
}
const Helmetglobal: React.FC<IProps> = ({
    title,
    keyword,
    description,
    twittersite,
    twittercreator,
    twittertitle,
    twitterdescription,
    twitterimage,
    ogdescription,
    ogtitle,
    ogurl,
    ogimage,
    fbappid }) => {
    return (
        <Helmet>


            {/* primary meta tags */}
            <title>{title}</title>‍
            <meta name="description" content={`${description}`} />
            <meta name="keywords" content={`${keyword}`} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="article" />
            <meta property="og:url" content={`${ogurl}`} />
            {ogtitle && <meta property="og:title" content={`${ogtitle}`} />}
            {ogdescription && <meta property="og:description" content={`${ogdescription}`} />}
            {ogimage && <meta property="og:image" content={`${ogimage}`} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={`${ogurl}`} />
            {twittertitle && <meta name="twitter:title" content={`${twittertitle}`} />}
            {twitterdescription && < meta name="twitter:description" content={`${twitterdescription}`} />}
            {twitterimage && <meta name="twitter:image" content={`${twitterimage}`} />}

            {/* optional */}
            {twittersite && <meta name="twitter:site" content={`${twittersite}`} />}
            {twittercreator && <meta name="twitter:creator" content={`${twittercreator}`} />}
            <meta property="og:site_name" content="PediaGeek" />
            <meta property="og:locale" content="en_US" />


        </Helmet>
    )
}

export default Helmetglobal
