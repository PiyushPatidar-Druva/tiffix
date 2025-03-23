import mongoose, { Document, Schema } from 'mongoose';

export interface IVendor extends Document {
  userId: mongoose.Types.ObjectId;
  businessName: string;
  description: string;
  cuisine: string[];
  isApproved: boolean;
  rating: number;
  totalRatings: number;
  deliveryAreas: string[];
  subscriptionPlans: {
    name: string;
    description: string;
    price: number;
    duration: number; // in days
    mealsPerDay: number;
    isActive: boolean;
  }[];
  bankDetails: {
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
  };
}

const vendorSchema = new Schema<IVendor>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  businessName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  cuisine: [{
    type: String,
    required: true
  }],
  isApproved: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  deliveryAreas: [{
    type: String,
    required: true
  }],
  subscriptionPlans: [{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    mealsPerDay: {
      type: Number,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  bankDetails: {
    accountNumber: {
      type: String,
      required: true
    },
    ifscCode: {
      type: String,
      required: true
    },
    accountHolderName: {
      type: String,
      required: true
    }
  }
}, {
  timestamps: true
});

export const Vendor = mongoose.model<IVendor>('Vendor', vendorSchema); 