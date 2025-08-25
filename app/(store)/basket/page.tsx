'use client';

import AddToBasketButton from "@/components/AddToBasketButton";
import useBasketStore from "@/store/store"
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import Loader from "@/components/Loader";
import { createCheckoutSession, Metadata } from "@/actions/createCheckoutSession";
import DeliveryCalculator from "@/components/DeliveryCalculator";


function BasketPage() {
    const groupedItems = useBasketStore((state) => state.getGroupedItems());
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const router = useRouter();

    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [deliveryFee, setDeliveryFee] = useState<number | null>(null);


    // wait for client to mount
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <Loader />;
    }

    if (groupedItems.length === 0) {
        return (
            <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
                <p className="text-gray-600 text-lg">Your basket is empty.</p>

            </div>
        );
    }

    const handleCheckout = async () => {
        if (!isSignedIn) return;
        setIsLoading(true);

        try {
            const metadata: Metadata = {
                orderNumber: crypto.randomUUID(), // example: ab3lks-aslks-afget-sfety
                customerName: user?.fullName ?? "Unknown",
                customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
                clerkUserId: user!.id,
            };

            const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            }
        } catch (error) {
            console.error("Error creating checkout session:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    console.log("BASKET CONTENTS", groupedItems);
    
    return (
    <div className="container mx-auto p-4 max-w-6xl">
        <h1 className="text-2xl font-bold mb-4">Your Basket</h1>
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow">
                {groupedItems?.map((item) => (
                    <div key={item.product._id} className="mb-4 p-4 border rounded flex items-center justify-between">

                        <div
                            className="flex items-center cursor-pointer flex-1 min-w-0"
                            onClick={() =>
                                router.push(`/product/${item.product.slug?.current}`)
                            }
                        >
                            <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                                {item.product.image && (
                                    <Image
                                        src={imageUrl(item.product.image).url()}
                                        alt={item.product.name ?? "Product image"}
                                        className="w-full h-full object-cover rounded"
                                        width={96}
                                        height={96}
                                    />
                                )}
                            </div>
                            <div className="min-w-0">
                                <h2 className="text-lg sm:text-xl font-semibold truncate">
                                    {item.product.name}
                                </h2>
                                <p className="text-sm sm:text-base">
                                    Price: £
                                    {((item.product.price ?? 0) * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center ml-4 flex-shrink-0">
                            <AddToBasketButton product={item.product}/>
                        </div>
                    </div>
                ))}
            </div>


            {/* Parent container */}
            <div className="lg:w-80 lg:order-last flex flex-col gap-4
                            fixed bottom-0 left-0 w-full max-h-[80vh] overflow-y-auto p-4
                            lg:static lg:max-h-full lg:top-4 lg:p-0">

            {/* Subtotal + Total + Checkout */}
            <div className="bg-white p-4 sm:p-6 border rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold border-b pb-2">Order Summary</h3>

                <div className="mt-4 space-y-3 sm:space-y-4">
                {/* Items Count */}
                <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                    <span>Items:</span>
                    <span className="font-medium">
                    {groupedItems.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                </div>

                {/* Subtotal + Total */}
                <div className="flex justify-between items-center border-t pt-2 text-base sm:text-lg font-semibold text-gray-900">
                <span>Subtotal:</span>
                <span>£{useBasketStore.getState().getTotalPrice().toFixed(2)}</span>
                </div>

                {deliveryFee !== null && (
                <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                    <span>Delivery:</span>
                    <span>£{deliveryFee.toFixed(2)}</span>
                </div>
                )}

                <div className="flex justify-between items-center border-t pt-3 text-xl sm:text-2xl font-bold text-gray-900">
                <span>Total:</span>
                <span>
                    £{(
                    useBasketStore.getState().getTotalPrice() +
                    (deliveryFee ?? 0)
                    ).toFixed(2)}
                </span>
                </div>
                </div>

                {/* Checkout Button */}
                <div className="mt-4 sm:mt-6">
                {isSignedIn ? (
                    <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 disabled:bg-gray-400 transition-colors duration-200"
                    >
                    {isLoading ? "Processing..." : "Checkout"}
                    </button>
                ) : (
                    <SignInButton mode="modal">
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Sign in to Checkout
                    </button>
                    </SignInButton>
                )}
                </div>
            </div>

            {/* Delivery Calculator */}
            <div className="bg-white p-4 sm:p-6 border rounded-lg shadow-md">
                <DeliveryCalculator onFeeChange={setDeliveryFee}/>
            </div>

            {/* Extra padding at bottom for mobile so button isn’t cut off */}
            <div className="h-4 lg:hidden"></div>
            </div>


            <div className="h-64 lg:h-0">
                {/* Spacer for fixed checkout on mobile */}
            </div>
        </div>
    </div>
  )
}
export default BasketPage

// 3:34:00