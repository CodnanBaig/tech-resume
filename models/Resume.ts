import mongoose, { Schema, Document } from 'mongoose';

export interface IResume extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  template: 'classic' | 'modern' | 'minimal' | 'developer' | 'creative' | 'startup';
  status: 'draft' | 'published';
  personalInfo: {
    fullName?: string;
    jobTitle?: string;
    email?: string;
    phone?: string;
    location?: string;
    website?: string;
    github?: string;
    linkedin?: string;
    summary?: string;
  };
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    location?: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
    technologies: string;
    link?: string;
    startDate?: string;
    endDate?: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    location?: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    description?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema = new Schema<IResume>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Resume title is required'],
      trim: true,
    },
    template: {
      type: String,
      enum: ['classic', 'modern', 'minimal', 'developer', 'creative', 'startup'],
      required: [true, 'Template type is required'],
      default: 'classic',
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    personalInfo: {
      fullName: String,
      jobTitle: String,
      email: String,
      phone: String,
      location: String,
      website: String,
      github: String,
      linkedin: String,
      summary: String,
    },
    skills: [String],
    experience: [{
      title: {
        type: String,
        required: [true, 'Job title is required'],
      },
      company: {
        type: String,
        required: [true, 'Company name is required'],
      },
      location: String,
      startDate: {
        type: String,
        required: [true, 'Start date is required'],
      },
      endDate: {
        type: String,
        required: [true, 'End date is required'],
      },
      description: {
        type: String,
        required: [true, 'Job description is required'],
      },
    }],
    projects: [{
      title: {
        type: String,
        required: [true, 'Project title is required'],
      },
      description: {
        type: String,
        required: [true, 'Project description is required'],
      },
      technologies: {
        type: String,
        required: [true, 'Technologies used are required'],
      },
      link: String,
      startDate: String,
      endDate: String,
    }],
    education: [{
      degree: {
        type: String,
        required: [true, 'Degree is required'],
      },
      institution: {
        type: String,
        required: [true, 'Institution name is required'],
      },
      location: String,
      startDate: {
        type: String,
        required: [true, 'Start date is required'],
      },
      endDate: {
        type: String,
        required: [true, 'End date is required'],
      },
      gpa: String,
      description: String,
    }],
  },
  {
    timestamps: true,
  }
);

// Delete the model if it exists to prevent OverwriteModelError
const Resume = mongoose.models.Resume || mongoose.model<IResume>('Resume', ResumeSchema);

export default Resume; 