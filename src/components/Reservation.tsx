import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Phone, Users, Calendar, Clock, Loader2, CheckCircle2, CreditCard, Mail, ArrowLeft, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// ✅ ONLY import db from firebase.ts (Bouncer is officially gone)
import { db } from '../firebase'; 

// Removed the test placeholder to prevent using it in prod; throw if missing
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
if (!PAYSTACK_PUBLIC_KEY && import.meta.env.PROD) {
  console.error("VITE_PAYSTACK_PUBLIC_KEY is not defined in production.");
}

const MENU_ITEMS = [
  { id: 'hennessy', name: 'Hennessy', price: 150000 },
  { id: 'azul', name: 'Azul', price: 500000 },
  { id: 'goat-soup', name: 'Goat pepper soup', price: 10000 },
  { id: 'hollandia', name: 'Hollandia Yoghurt', price: 7000 },
  { id: 'coke', name: 'Coke', price: 5000 },
  { id: 'fanta', name: 'Fanta', price: 5000 },
  { id: 'sprite', name: 'Sprite', price: 5000 },
];

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export default function Reservation() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '1',
    date: '',
    time: '',
  });

  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState(MENU_ITEMS[0].id);
  
  // ✅ RESTORED: Quantity State for the selector
  const [itemQuantity, setItemQuantity] = useState(1);

  // ✅ RESTORED: Full Guest Options 1 to 20+
  const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  const grandTotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

  const handleAddItem = () => {
    // Basic bounds checking for quantity
    const quantity = Math.max(1, Math.min(99, itemQuantity));
    
    const item = MENU_ITEMS.find(i => i.id === selectedItemId);
    if (!item) return;

    const existingItemIndex = orderItems.findIndex(i => i.id === selectedItemId);
    if (existingItemIndex > -1) {
      const updatedItems = [...orderItems];
      updatedItems[existingItemIndex].quantity += quantity;
      updatedItems[existingItemIndex].subtotal = updatedItems[existingItemIndex].quantity * item.price;
      setOrderItems(updatedItems);
    } else {
      setOrderItems([...orderItems, {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: quantity,
        subtotal: quantity * item.price
      }]);
    }
    setItemQuantity(1); // Reset to 1 after adding
  };

  const handleRemoveItem = (id: string) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const handleNextStep = (e: FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (formData.name.trim().length === 0 || formData.name.length > 100) {
      alert('Please enter a valid name (up to 100 characters).');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) || formData.email.length > 100) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!/^[+]?[\d\s-]{10,20}$/.test(formData.phone)) {
      alert('Please enter a valid phone number.');
      return;
    }

    if (orderItems.length === 0) {
      alert('Please add at least one item to your order.');
      return;
    }
    setStep('payment');
  };

  const saveReservation = async (reference: string) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "reservations"), {
        ...formData,
        orderItems,
        totalAmount: grandTotal,
        paymentReference: reference,
        status: 'confirmed', 
        createdAt: serverTimestamp(),
      });
      
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', guests: '1', date: '', time: '' });
      setOrderItems([]);
      setStep('details');
      setTimeout(() => setIsSuccess(false), 8000);
    } catch (error) {
      // Don't leak exact reference in user alert, log it securely instead
      console.error("Error saving reservation to database."); 
      alert('There was an error saving your reservation. Please contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaystackPayment = () => {
    if (!PAYSTACK_PUBLIC_KEY) {
      alert('Payment system is not properly configured.');
      return;
    }
    
    // Generate secure random UUID instead of Math.random
    const ref = 'CEO-' + crypto.randomUUID();

    const handler = (window as any).PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: formData.email,
      amount: grandTotal * 100, // Kobo conversion
      currency: 'NGN',
      ref: ref,
      callback: (response: any) => saveReservation(response.reference),
      onClose: () => alert('Transaction cancelled.'),
    });
    handler.openIframe();
  };

  return (
    <section id="reserve" className="py-24 bg-deep-black relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass p-8 md:p-12 rounded-[2rem] border-t-4 border-gold-accent"
        >
          {isSuccess ? (
            <motion.div className="flex flex-col items-center justify-center py-12 text-center">
               <CheckCircle2 size={48} className="text-emerald-500 mb-6" />
               <h3 className="text-2xl font-black mb-2 text-white">RESERVATION CONFIRMED!</h3>
               <p className="text-soft-white/60">Your table is secured. See you at Club CEO.</p>
               <button onClick={() => setIsSuccess(false)} className="mt-8 text-gold-accent font-bold uppercase tracking-widest text-xs">Book another table</button>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              {step === 'details' ? (
                <motion.form key="details" onSubmit={handleNextStep} className="grid lg:grid-cols-5 gap-8">
                  <div className="lg:col-span-3 space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input type="text" maxLength={100} required placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-gold-accent"/>
                      <input type="email" maxLength={100} required placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-gold-accent"/>
                      <input type="tel" maxLength={20} required placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-gold-accent"/>
                      
                      {/* ✅ GUEST DROPDOWN RESTORED 1 to 20+ */}
                      <select value={formData.guests} onChange={(e) => setFormData({...formData, guests: e.target.value})} className="bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-gold-accent">
                        {guestOptions.map(n => (
                          <option key={n} value={n} className="bg-black">{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                        <option value="20+" className="bg-black">20+ Guests</option>
                      </select>

                      <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="bg-white/5 border border-white/10 p-4 rounded-xl text-white [color-scheme:dark]"/>
                      <input type="time" required value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="bg-white/5 border border-white/10 p-4 rounded-xl text-white [color-scheme:dark]"/>
                    </div>

                    <div className="glass p-6 rounded-2xl border border-white/5">
                     <h4 className="text-soft-white font-bold uppercase text-[10px] tracking-widest mb-4 flex items-center gap-2"><ShoppingBag size={14} className="text-gold-accent"/> Add Drinks & Appetizers</h4>
                     <div className="flex flex-col sm:flex-row gap-3">
                       <select value={selectedItemId} onChange={(e) => setSelectedItemId(e.target.value)} className="flex-1 bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none">
                         {MENU_ITEMS.map(i => <option key={i.id} value={i.id} className="bg-black">{i.name} - ₦{i.price.toLocaleString()}</option>)}
                       </select>

                       {/* ✅ QUANTITY INPUT RESTORED */}
                       <input type="number" min="1" max="99" value={itemQuantity} onChange={(e) => setItemQuantity(parseInt(e.target.value) || 1)} className="w-full sm:w-20 bg-white/5 border border-white/10 p-3 rounded-xl text-white text-center"/>
                       
                       <button type="button" onClick={handleAddItem} className="bg-gold-accent text-black font-black px-6 py-3 rounded-xl hover:bg-white transition-all">+ ADD</button>
                     </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="glass p-6 rounded-2xl h-full border border-white/10 flex flex-col">
                      <h4 className="text-white font-bold text-xs tracking-widest mb-4 uppercase pb-2 border-b border-white/10">Order Summary</h4>
                      <div className="flex-1 space-y-3 overflow-y-auto max-h-[250px] pr-2 custom-scrollbar">
                        {orderItems.map(item => (
                          <div key={item.id} className="flex justify-between items-center text-sm text-white group">
                            <div><p className="font-bold">{item.name}</p><p className="text-white/40 text-xs">{item.quantity} x ₦{item.price.toLocaleString()}</p></div>
                             <div className="flex items-center gap-3"><span className="text-gold-accent font-bold">₦{item.subtotal.toLocaleString()}</span><button onClick={() => handleRemoveItem(item.id)} className="text-red-500/50 hover:text-red-500"><Trash2 size={14}/></button></div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 pt-4 border-t border-white/10">
                        <div className="flex justify-between mb-6"><span className="text-white/40 font-bold text-[10px] tracking-widest">TOTAL</span><span className="text-2xl font-black text-gold-accent">₦{grandTotal.toLocaleString()}</span></div>
                        <button type="submit" className="w-full bg-neon-purple py-4 rounded-xl font-black text-white uppercase tracking-widest shadow-lg">Book & Pay →</button>
                      </div>
                    </div>
                  </div>
                </motion.form>
              ) : (
                <motion.div key="payment" className="max-w-md mx-auto">
                  <div className="glass p-8 rounded-2xl border border-white/10 mb-8 text-center">
                    <h4 className="text-white font-bold tracking-widest mb-6">FINAL SUMMARY</h4>
                    <div className="space-y-2 mb-6 text-sm text-white/60">
                      <p>{formData.name}</p>
                      <p>{formData.guests} Guests | {formData.date} @ {formData.time}</p>
                    </div>
                    <div className="text-3xl font-black text-gold-accent mb-8">₦{grandTotal.toLocaleString()}</div>
                    <button onClick={handlePaystackPayment} disabled={isSubmitting} className="w-full bg-emerald-500 py-5 rounded-xl font-black text-white tracking-widest disabled:opacity-50">
                      {isSubmitting ? <Loader2 className="animate-spin mx-auto"/> : "CONFIRM & PAY NOW"}
                    </button>
                  </div>
                  <button onClick={() => setStep('details')} className="w-full text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"><ArrowLeft size={14}/> Back to Details</button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </section>
  );
}
