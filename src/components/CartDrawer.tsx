import { Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import type { CartItem } from '@/types';
import { formatPrice } from '@/data/products';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  totalPrice: number;
}

const CartDrawer = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemove,
  totalPrice,
}: CartDrawerProps) => {
  const handleCheckout = () => {
    const message = cart
      .map(
        (item) =>
          `${item.product.name} (${item.product.size}) x${item.quantity} - ${formatPrice(
            item.product.price * item.quantity
          )}`
      )
      .join('\n');
    
    const total = formatPrice(totalPrice);
    const whatsappMessage = `Hello 𝕸𝖎𝖗𝖆𝖈𝖑𝖊 𝕾𝖎𝖌𝖓𝖆𝖙𝖚𝖗𝖊 𝕾𝖈𝖊𝖓𝖙𝖘✍!\n\nI'd like to order:\n${message}\n\nTotal: ${total}`;
    
    window.open(
      `https://wa.me/2348086352289?text=${encodeURIComponent(whatsappMessage)}`,
      '_blank'
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md bg-dark border-l border-gold/20">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl text-ivory flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-gold" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col h-[calc(100vh-200px)]">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <ShoppingBag className="w-16 h-16 text-gold/30 mb-4" />
              <p className="text-ivory/60 font-body">Your cart is empty</p>
              <p className="text-ivory/40 text-sm mt-2">
                Add some luxury fragrances
              </p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto space-y-4 pr-2">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3 bg-dark-secondary rounded-sm"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover rounded-sm"
                    />
                    <div className="flex-1">
                      <h4 className="font-display text-lg text-ivory">
                        {item.product.name}
                      </h4>
                      <p className="text-ivory/50 text-sm">
                        {item.product.size}
                      </p>
                      <p className="text-gold font-medium mt-1">
                        {formatPrice(item.product.price)}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                            className="w-7 h-7 flex items-center justify-center bg-dark-tertiary text-ivory hover:bg-gold hover:text-dark transition-colors rounded-sm"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-ivory">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                            className="w-7 h-7 flex items-center justify-center bg-dark-tertiary text-ivory hover:bg-gold hover:text-dark transition-colors rounded-sm"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemove(item.product.id)}
                          className="p-2 text-ivory/40 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gold/20 pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-ivory/60 font-body">Total</span>
                  <span className="font-display text-2xl text-gold">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-gold text-dark font-body text-sm tracking-widest uppercase hover:bg-gold-light transition-colors rounded-sm"
                >
                  Checkout via WhatsApp
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
