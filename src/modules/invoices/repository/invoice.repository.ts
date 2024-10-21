import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address";
import Invoice from "../domain/invoice.entity";
import invoiceEntity from "../domain/invoice.entity";
import InvoiceItem from "../domain/invoice-item.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemModel } from "./item.model";

export default class InvoiceRepository implements InvoiceGateway {
  async create(invoice: invoiceEntity): Promise<void> {
    await InvoiceModel.create(
      {
        id: invoice.id.id,
        name: invoice.name,
        document: invoice.document,
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
        items: invoice.items.map((item: InvoiceItem) => ({
          id: item.id.id,
          name: item.name,
          price: item.price,
        })),
        total: invoice.total,
        createdAt: invoice.createdAt,
      },
      {
        include: [InvoiceItemModel],
      }
    );
  }
  find(id: string): Promise<invoiceEntity> {
    return InvoiceModel.findOne({
      where: {
        id,
      },
      include: [InvoiceItemModel],
    }).then((invoice: InvoiceModel) => {
      return new Invoice({
        id: new Id(invoice.id),
        name: invoice.name,
        document: invoice.document,
        address: new Address(
          invoice.street,
          invoice.number,
          invoice.complement,
          invoice.city,
          invoice.state,
          invoice.zipCode
        ),
        items: invoice.items.map(
          (item: any) =>
            new InvoiceItem({
              id: new Id(item.id),
              name: item.name,
              price: item.price,
            })
        ),
        createdAt: invoice.createdAt,
      });
    });
  }
}
