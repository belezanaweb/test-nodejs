class Repository {
  constructor({ ResourceModel, ResourceMapper, Exceptions }) {
    this.ResourceModel = ResourceModel;
    this.ResourceMapper = ResourceMapper;
    this.Exceptions = Exceptions;
  }

  async create(domainEntity) {
    const resource = await new this.ResourceModel(this.ResourceMapper.toInputDatabase(domainEntity));
    const dbCreatedResource = await resource.save();
    return this.ResourceMapper.toOutputDabase(dbCreatedResource);
  }

  async findOne(query) {
    const resource = await this.ResourceModel.findOne(query);
    if (!resource) return resource;
    return this.ResourceMapper.toOutputDabase(resource);
  }

  async findAll(query) {
    const resource = await this.ResourceModel.findAll(query);
    if (!resource) return resource;
    return resource.map(this.ResourceMapper.toOutputDabase);
  }

  async remove(query) {
    const resource = await this.ResourceModel.destroy(query);
    return resource > 0;
  }
}

module.exports = Repository;
