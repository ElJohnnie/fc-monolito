import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
  id?: Id;
  name: string;
  description: string;
  purchasePrice: number;
};

export class Product extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _description: string;
  private _purchasePrice: number;

  constructor(props: ProductProps) {
    super(props.id);
    this._name = props.name;
    this._description = props.description;
    this._purchasePrice = props.purchasePrice;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get purchasePrice() {
    return this._purchasePrice;
  }
}
