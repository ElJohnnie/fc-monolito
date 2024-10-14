import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address";
import Invoice from "./invoice.entity";
import InvoiceItem from "./invoice-item.entity";

describe("Invoice unit test", () => {
  it("should calculate the invoice total", () => {
    const invoice = new Invoice({
      id: new Id("1"),
      name: "Teste",
      document: "12345678901",
      address: new Address(
        "Rua Teste",
        "123",
        "complemento",
        "Teste",
        "Teste",
        "12345678",
      ),
      items: [
        new InvoiceItem({
          id: new Id("1"),
          name: "Teste",
          price: 10,
        }),
        new InvoiceItem({
          id: new Id("2"),
          name: "Teste 2",
          price: 20,
        }),
      ],
    });

    expect(invoice.total).toBe(30);
  });
});
