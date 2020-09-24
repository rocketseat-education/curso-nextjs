interface AddToCartModalProps {
  title: string;
}

export default function AddToCartModal({ title }: AddToCartModalProps) {
  return (
    <div>
      <p>Do you want to add {title} to cart?</p>

      <button>Cancel</button>
      <button>Add to cart</button>
    </div>
  );
}