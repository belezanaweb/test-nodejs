const { products, populateProducts } = require("./productSeed");
const { Product } = require("./productModel");
const request = require("supertest");
const { server } = require("./../../index");

let postData = {
  sku: 23226,
  name: "1 Million Paco Rabanne Eau de Toilette - Perfume Masculino 200ml",
  inventory: {
    warehouses: [
      {
        locality: "DF",
        quantity: 21,
        type: "ECOMMERCE"
      }
    ]
  }
};

describe("Product", () => {
  beforeAll(populateProducts);

  describe("/GET", () => {
    it("should get all products", done => {
      request(server)
        .get("/api/product")
        .expect(200)
        .expect(({ body }) => {
          expect(typeof body).toBe("object");
        })
        .end(done);
    });

    it("should get an specific product", done => {
      request(server)
        .get(`/api/product/${products[0].sku}`)
        .expect(200)
        .expect(({ body }) => {
          expect(typeof body.inventory.quantity).toBe("number");
          expect(body.isMarketable).toBeTruthy();
        })
        .end(done);
    });

    it("should not get an specific product", done => {
      request(server)
        .get(`/api/product/1`)
        .expect(404)
        .end(done);
    });
  });

  describe("/POST", () => {
    it("should create a new product", done => {
      request(server)
        .post("/api/product")
        .send(postData)
        .expect(201)
        .expect(({ body }) => {
          expect.objectContaining({
            _id: expect(typeof body._id).toBe("string"),
            sku: expect(body.sku).toBe(postData.sku),
            name: expect(body.name).toBe(postData.name)
          });
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          Product.findById(res.body._id)
            .then(product => {
              expect(product.sku).toBe(res.body.sku);
              done();
            })
            .catch(e => done(e));
        });
    });

    it("should not accept create a new product with the same sku", done => {
      request(server)
        .post("/api/product")
        .send(postData)
        .expect(406)
        .expect(res => {
          expect(res.text).toBe(
            "Product validation failed: sku: Dois produtos são considerados iguais se os seus skus forem iguais."
          );
        })
        .end(done);
    });
  });

  describe("/PUT", () => {
    it("should update a product by sku", done => {
      products[0].name =
        "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 100g";

      request(server)
        .put(`/api/product/${products[0].sku}`)
        .send(products[0])
        .expect(200)
        .expect(({ body }) => {
          expect(body.name).toBe(products[0].name);
        })
        .end(done);
    });
  });

  describe("/DELETE", () => {
    it("should remove a product", done => {
      request(server)
        .delete(`/api/product/${products[0].sku}`)
        .expect(200)
        .end(() => {

          Product.findOne({ sku: products[0].sku })
            .then(product => {
              expect(product).toBeNull();
              done();
            })
            .catch(e => done(e));
        });
    });
  });
});
