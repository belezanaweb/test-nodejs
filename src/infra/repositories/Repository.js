class Repository {
  constructor({ ResourceModel, ResourceMapper, Exceptions }) {
    this.ResourceModel = ResourceModel;
    this.ResourceMapper = ResourceMapper;
    this.Exceptions = Exceptions;
  }

  async create(domainEntity) {
    const model = await new this.ResourceModel(this.ResourceMapper.toInputDatabase(domainEntity));
    const dbCreatedResource = await model.save();
    return this.ResourceMapper.toOutputDabase(dbCreatedResource);
  }

  async findAll(query) {
    const model = await this.ResourceModel.findAll(query);
    if (!model) return model;
    return model.map(this.ResourceMapper.toOutputDabase);
  }
}

module.exports = Repository;
