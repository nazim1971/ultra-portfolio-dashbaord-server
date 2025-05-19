import {
  FilterQuery,
  HydratedDocument,
  Query
} from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<HydratedDocument<T>[], HydratedDocument<T>>;
  public query: Record<string, unknown>;

  constructor(
    modelQuery: Query<HydratedDocument<T>[], HydratedDocument<T>>,
    query: Record<string, unknown>
  ) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }

  priceRange() {
    const minPrice = this?.query?.minPrice
      ? Number(this.query.minPrice)
      : undefined;
    const maxPrice = this?.query?.maxPrice
      ? Number(this.query.maxPrice)
      : undefined;
    const priceFilter: Record<string, unknown> = {};

    if (minPrice !== undefined) priceFilter.$gte = minPrice;
    if (maxPrice !== undefined) priceFilter.$lte = maxPrice;

    if (Object.keys(priceFilter).length > 0) {
      this.modelQuery = this.modelQuery.find({
        price: priceFilter,
      } as FilterQuery<T>);
    }

    return this;
  }

  filterByBedrooms() {
    const bedrooms = this?.query?.bedrooms
      ? Number(this.query.bedrooms)
      : undefined;
    if (bedrooms !== undefined) {
      this.modelQuery = this.modelQuery.find({ bedrooms });
    }
    return this;
  }

  filterByLocation() {
    const location = this?.query?.location as string;
    if (location) {
      this.modelQuery = this.modelQuery.find({
        location: { $regex: location, $options: 'i' },
      } as FilterQuery<T>);
    }
    return this;
  }
}

export default QueryBuilder;
