<?php

namespace App\Http\Controllers;

use App\Models\CartOrder;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function destroy($id)
{
    // Find the order by ID and delete it
    $order = CartOrder::findOrFail($id);
    $order->delete();

    // Set a session success message
    $notification = [
        'message' => 'Order deleted successfully!',
        'alert-type' => 'success'
    ];

    // Redirect back with the success message
    return redirect()->back()->with($notification);
}

}
