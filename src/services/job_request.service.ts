import JobRequestSchema from "../models/job_request.model";
import type { IJobRequest, IJobRequestConfig } from "../interface/job_request.interface";

class JobRequestService {
    // Get job request with URL from environment
    static async getJobRequestConfig(): Promise<IJobRequestConfig | null> {
        try {
            const dbRequest = await JobRequestSchema.findOne({});
            
            if (!dbRequest) {
                return null;
            }

            // Get URL from environment variable
            const url = process.env.JOB_REQUEST_URL || "";

            return {
                url,
                button_text: dbRequest.button_text,
                is_hide: dbRequest.is_hide,
            };
        } catch (error) {
            throw new Error(`Error fetching job request config: ${error}`);
        }
    }


    // Create or update job request (singleton pattern)
    static async createOrUpdateJobRequest({ data }: { data: Partial<IJobRequest> }) {
        try {
            // Check if document exists
            const existing = await JobRequestSchema.findOne({});
            
            if (existing) {
                // Update existing
                const updated = await JobRequestSchema.findByIdAndUpdate(
                    existing._id,
                    data,
                    { new: true }
                );
                return updated;
            } else {
                // Create new
                const newRequest = new JobRequestSchema(data);
                const saved = await newRequest.save();
                return saved;
            }
        } catch (error) {
            throw new Error(`Error creating/updating job request: ${error}`);
        }
    }
    static async getActiveJobRequest(): Promise<IJobRequest | null> {
        try {
            const jobRequest = await JobRequestSchema.findOne({ is_hide: false });
            return jobRequest;
        } catch (error) {
            throw new Error(`Error fetching active job request: ${error}`);
        }
    }

}

export default JobRequestService;
