const express = require('express');
const config = require('./config/db');
const app = express();
const authRouter = require('./routes/authRoute');
const bannerRouter = require('./routes/bannerRoute');
const businessRouter = require('./routes/businessRoute');
const clientLogoRoutes = require('./routes/clientLogoRoute');
const sustainabilityRoute = require('./routes/sustainabilityRoute');
const portfolioRoute = require('./routes/portfolioRoute');
const careerRoute = require('./routes/careerRoute');
const aboutOneRoute = require('./routes/aboutOneRoute');
const comOneRoute = require('./routes/comOneRoute');
const purposeRoute = require('./routes/purposeRoute');
const coreValuesRoute = require('./routes/coreValuesRoute');
const timelineRoute = require('./routes/timelineRoute');
const leadershipRoute = require('./routes/leadershipRoute');
const managementRoute = require('./routes/managementRoute');
const projectRoute = require('./routes/projectRoute');
const portfolioOverviewRoute = require('./routes/portfolioOverviewRoute');
const PreDevelopmentRoute = require('./routes/PreDevelopmentRoute');
const CultureRoute = require('./routes/CultureRoute');
const awardsRoute = require('./routes/awardsRoute');
const contactRoute = require('./routes/contactRoute');
const careersRoute = require('./routes/careersRoute');
const pressReleaseRoute = require('./routes/pressReleaseRoute');
const PressBannerRoute = require('./routes/PressBannerRoute');
const MediaBannerRoute = require('./routes/MediaBannerRoute');
const MediaReleaseRoute = require('./routes/MediaReleaseRoute');
const FAQsRoute = require('./routes/FAQsBannerRoute');
const faqsQuestionsRoute = require('./routes/faqsQuestionsRoute');
const BlogBannerRoute = require('./routes/BlogBannerRoute');
const blogDetailRoute = require('./routes/blogDetailRoute');
const CaseStudiesBannerRoute = require('./routes/CaseStudiesBannerRoute');
const CaseStudiesRoute = require('./routes/CaseStudiesRoute');




const cors = require('cors')
require('dotenv').config();

app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
})

app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'));

app.use('/auth', authRouter);
app.use('/banners', bannerRouter);
app.use('/business', businessRouter);
app.use('/client-logos', clientLogoRoutes);
app.use('/sustainability', sustainabilityRoute);
app.use('/portfolio', portfolioRoute);
app.use('/career', careerRoute);
app.use('/about-banner', aboutOneRoute);
app.use('/com-banner', comOneRoute);
app.use('/purpose', purposeRoute);
app.use('/values', coreValuesRoute);
app.use('/timeline', timelineRoute);
app.use('/leadership', leadershipRoute);
app.use('/management', managementRoute);
app.use('/project', projectRoute);
app.use('/portfolio-overview', portfolioOverviewRoute);
app.use('/pre-development', PreDevelopmentRoute);
app.use('/culture', CultureRoute);
app.use('/awards-data', awardsRoute);
app.use('/contact-data', contactRoute);
app.use('/careers-data', careersRoute);
app.use('/press-releases', pressReleaseRoute);
app.use('/press-banner', PressBannerRoute);
app.use('/media-banner', MediaBannerRoute);
app.use('/media-releases', MediaReleaseRoute);
app.use('/faqs', FAQsRoute);
app.use('/faqs-questions', faqsQuestionsRoute);
app.use('/blog-banner', BlogBannerRoute);
app.use('/blog-detail', blogDetailRoute);
app.use('/case-studies-banner', CaseStudiesBannerRoute);
app.use('/case-studies', CaseStudiesRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})
