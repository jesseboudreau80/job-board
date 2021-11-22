const { Types } = require('mongoose');
const mongoose = require('mongoose');

const getCompanyConnection = () => {
  const companyConn = mongoose.createConnection(global.gConfig.company_conn);
  mongoose.set('debug', true);

  const IndustrySchema = new mongoose.Schema({
    name: String,
  });

  const MediumSchema = new mongoose.Schema({
    url: String,
    altText: String,
  });

  const CompanySchema = new mongoose.Schema({
    name: String,
    description: mongoose.Schema.Types.Mixed,
    about: String,
    workCulture: String,
    values: String,
    foundedOn: Date,
    mission: String,
    ceo: String,
    industry: IndustrySchema,
    headquarters: String,
    revenue: String,
    size: Number,
    website: String,
    type: String,
    avgHappinessScore: Number,
    learningScore: Number,
    appreciationScore: Number,
    employers: [mongoose.Types.ObjectId],
    media: [MediumSchema],
  });

  const EmployerSchema = new mongoose.Schema({
    name: String,
    role: String,
    address: String,
    dateOfBirth: String,
    medium: MediumSchema,
    companyId: Types.ObjectId,
  });

  const JobSchema = new mongoose.Schema({
    title: String,
    industry: IndustrySchema,
    city: String,
    state: String,
    country: String,
    address: String,
    jobLocation: {
      type: String,
      enum: ['remote', 'in_person'],
    },
    type: {
      type: String,
      enum: ['internship', 'full_time', 'contract'],
    },
    zipcode: Number,
    postedOn: Date,
    salary: Number,
    description: mongoose.Schema.Types.Mixed,
    isFeatured: Boolean,
    questions: [String],
    companyId: mongoose.Types.ObjectId,
  });

  const Company = companyConn.model('companies', CompanySchema);
  const Employer = companyConn.model('employers', EmployerSchema);
  const Job = companyConn.model('jobs', JobSchema);

  return { companyConn, Company, Employer, Job };
};

const getUserConnection = () => {};

const getReviewConnection = () => {
  const reviewConn = mongoose.createConnection(global.gConfig.review_conn);
  mongoose.set('debug', true);

  const ReviewSchema = new mongoose.Schema({
    overallRating: Number,
    workLifeBalance: Number,
    compensation: Number,
    jobSecurity: Number,
    management: Number,
    jobCulture: Number,
    summary: String,
    review: String,
    pros: String,
    cons: String,
    ceoApproval: Boolean,
    tips: String,
    companyId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    isFeatured: Boolean,
    status: {
      type: String,
      enum: ['APPROVED', 'REJECTED', 'PENDING'],
    },
    reviewDate: Date,
  });

  const Review = reviewConn.model('reviews', ReviewSchema);

  return { Review };
};

module.exports = {
  getCompanyConnection,
  getUserConnection,
  getReviewConnection,
};
