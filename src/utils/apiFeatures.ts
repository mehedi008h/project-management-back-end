import { Query, Document } from "mongoose";

class APIFeatures<T extends Document> {
    query: Query<T[], T>;
    queryStr: any;

    constructor(query: Query<T[], T>, queryStr: any) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.search
            ? {
                  title: {
                      $regex: this.queryStr.search,
                      $options: "i",
                  },
              }
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy: any = { ...this.queryStr };

        // Removing fields from the query
        const removeFields = ["search", "page"];
        removeFields.forEach((el) => delete queryCopy[el]);

        // Advance filter for price, ratings, etc.
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(
            /\b(gt|gte|lt|lte)\b/g,
            (match) => `$${match}`
        );

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resPerPage: number) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

export default APIFeatures;
