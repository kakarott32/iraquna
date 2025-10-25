import ReportSchema from "../models/report.model";
import type { IReport } from "../interface/report.interface";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId.createFromHexString;

interface IPaginatedReports {
    reports: IReport[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalReports: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        limit: number;
    };
}

class ReportService {
    private reportSchema = ReportSchema;

    public async getAllReportsWithPagination({
        page = 1,
        limit = 10,
        isRead,
    }: {
        page?: number;
        limit?: number;
        isRead?: boolean;
    }): Promise<IPaginatedReports> {
        const skip = (page - 1) * limit;
        
        // Build filter object
        const filter: any = {};
        if (isRead !== undefined) {
            filter.is_read = isRead;
        }

        // Get reports with pagination
        const reports = await this.reportSchema
            .find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        // Get total count for pagination
        const totalReports = await this.reportSchema.countDocuments(filter);
        const totalPages = Math.ceil(totalReports / limit);

        return {
            reports,
            pagination: {
                currentPage: page,
                totalPages,
                totalReports,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
                limit,
            },
        };
    }

    public async createReport({
        data,
    }: {
        data: IReport;
    }) {
        const report = await this.reportSchema.create(data);
        return report;
    }

    public async updateReportReadStatus({
        id,
        is_read,
    }: {
        id: string;
        is_read: boolean;
    }) {
        const updatedReport = await this.reportSchema.findByIdAndUpdate(
            id,
            { is_read },
            { new: true }
        );
        return updatedReport;
    }

    public async deleteReport({
        id,
    }: {
        id: string;
    }) {
        const deletedReport = await this.reportSchema.findByIdAndDelete(id);
        return deletedReport;
    }

    public async getReportsCount({
        isRead,
    }: {
        isRead?: boolean;
    } = {}) {
        const filter: any = {};
        if (isRead !== undefined) {
            filter.is_read = isRead;
        }
        
        const count = await this.reportSchema.countDocuments(filter);
        return count;
    }

}

export default new ReportService();