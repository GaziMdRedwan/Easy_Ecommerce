<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductList;
use App\Models\ProductDetails;
use App\Models\Category;
use App\Models\Subcategory;
use Image;
 
class ProductListController extends Controller
{
    public function ProductListByRemark(Request $request){

        $remark = $request->remark;
        $productlist = ProductList::where('remark',$remark)->limit(8)->get();
        return $productlist;

    } // End Method 

    public function ProductListByCategory(Request $request){

        $Category = $request->category;
        $productlist = ProductList::where('category',$Category)->get();
        return $productlist;

    }// End Method 


    public function ProductListBySubCategory(Request $request){

        $Category = $request->category;
        $SubCategory = $request->subcategory;
        $productlist = ProductList::where('category',$Category)->where('subcategory',$SubCategory)->get();

        return $productlist;

    }// End Method 



    public function ProductBySearch(Request $request){

        $key = $request->key;
        $productlist = ProductList::where('title','LIKE',"%{$key}%")->orWhere('brand','LIKE',"%{$key}%")->get();
        return $productlist;

    }// End Method 


    public function SimilarProduct(Request $request){
        $subcategory = $request->subcategory;
        $productlist = ProductList::where('subcategory',$subcategory)->orderBy('id','desc')->limit(6)->get();
        return $productlist;

    }// End Method 



    public function GetAllProduct(){

        $products = ProductList::latest()->paginate(10);
        return view('backend.product.product_all',compact('products'));

    } // End Method 


    public function AddProduct(){

        $category = Category::orderBy('category_name','ASC')->get();
        $subcategory = Subcategory::orderBy('subcategory_name','ASC')->get();
        return view('backend.product.product_add',compact('category','subcategory'));

    } // End Method 


    public function StoreProduct(Request $request){

         $request->validate([
            'product_code' => 'required',
        ],[
            'product_code.required' => 'Input Product Code'

        ]);

        $image = $request->file('image');
        $name_gen = hexdec(uniqid()).'.'.$image->getClientOriginalExtension();
        Image::make($image)->resize(711,960)->save('upload/product/'.$name_gen);
        $save_url = 'http://127.0.0.1:8000/upload/product/'.$name_gen;

        $product_id = ProductList::insertGetId([
            'title' => $request->title,
            'price' => $request->price,
            'special_price' => $request->special_price,
            'category' => $request->category,
            'subcategory' => $request->subcategory,
            'remark' => $request->remark,
            'brand' => $request->brand,
            'product_code' => $request->product_code,
            'image' => $save_url, 

        ]);

        /////// Insert Into Product Details Table ////// 

    $image1 = $request->file('image_one');
    $name_gen1 = hexdec(uniqid()).'.'.$image1->getClientOriginalExtension();
    Image::make($image1)->resize(711,960)->save('upload/productdetails/'.$name_gen1);
    $save_url1 = 'http://127.0.0.1:8000/upload/productdetails/'.$name_gen1;


    $image2 = $request->file('image_two');
    $name_gen2 = hexdec(uniqid()).'.'.$image2->getClientOriginalExtension();
    Image::make($image2)->resize(711,960)->save('upload/productdetails/'.$name_gen2);
    $save_url2 = 'http://127.0.0.1:8000/upload/productdetails/'.$name_gen2;


     $image3 = $request->file('image_three');
    $name_gen3 = hexdec(uniqid()).'.'.$image3->getClientOriginalExtension();
    Image::make($image1)->resize(711,960)->save('upload/productdetails/'.$name_gen3);
    $save_url3 = 'http://127.0.0.1:8000/upload/productdetails/'.$name_gen3;



     $image4 = $request->file('image_four');
    $name_gen4 = hexdec(uniqid()).'.'.$image4->getClientOriginalExtension();
    Image::make($image4)->resize(711,960)->save('upload/productdetails/'.$name_gen4);
    $save_url4 = 'http://127.0.0.1:8000/upload/productdetails/'.$name_gen4;

        ProductDetails::insert([
            'product_id' => $product_id,
            'image_one' => $save_url1,
            'image_two' => $save_url2,
            'image_three' => $save_url3,
            'image_four' => $save_url4,
            'short_description' => $request->short_description,
            'color' =>  $request->color,
            'size' =>  $request->size,
            'long_description' => $request->long_description,

        ]);


        $notification = array(
            'message' => 'Product Inserted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.product')->with($notification);


    } // End Method 

public function EditProduct($id){

        $category = Category::orderBy('category_name','ASC')->get();
        $subcategory = Subcategory::orderBy('subcategory_name','ASC')->get();
        $product = ProductList::findOrFail($id);
        $details = ProductDetails::where('product_id',$id)->get();
        return view('backend.product.product_edit',compact('category','subcategory','product','details'));

    } // End Method 

public function UpdateProduct(Request $request, $id)
{
    $product = Product::findOrFail($id); // Find the product by its ID

    // Update other product fields
    $product->title = $request->title;
    $product->product_code = $request->product_code;
    // Continue updating other fields...

    // Check if a new image is uploaded
    if ($request->hasFile('image')) {
        $file = $request->file('image');
        $filename = date('YmdHi') . '.' . $file->getClientOriginalExtension();  // Generate a unique filename
        $file->move(public_path('uploads/products'), $filename); // Move the file to the designated folder
        $product->image = 'uploads/products/' . $filename; // Update the product image path
    }

    // Handle other image uploads similarly (image_one, image_two, etc.)
    if ($request->hasFile('image_one')) {
        $fileOne = $request->file('image_one');
        $filenameOne = date('YmdHi') . '_one.' . $fileOne->getClientOriginalExtension();
        $fileOne->move(public_path('uploads/products'), $filenameOne);
        $product->image_one = 'uploads/products/' . $filenameOne;
    }

    if ($request->hasFile('image_two')) {
        $fileTwo = $request->file('image_two');
        $filenameTwo = date('YmdHi') . '_two.' . $fileTwo->getClientOriginalExtension();
        $fileTwo->move(public_path('uploads/products'), $filenameTwo);
        $product->image_two = 'uploads/products/' . $filenameTwo;
    }

    // ...handle image_three and image_four similarly if needed.

    // Save the updated product
    $product->save();

    return redirect()->back()->with('success', 'Product updated successfully');
}

public function DeleteProduct($id)
{
    // Find the product by its ID
    $product = ProductList::findOrFail($id);

    // Delete the main image if it exists
    if (file_exists(public_path($product->image))) {
        unlink(public_path($product->image));
    }

    // Delete additional images if they exist
    if ($product->image_one && file_exists(public_path($product->image_one))) {
        unlink(public_path($product->image_one));
    }

    if ($product->image_two && file_exists(public_path($product->image_two))) {
        unlink(public_path($product->image_two));
    }

    if ($product->image_three && file_exists(public_path($product->image_three))) {
        unlink(public_path($product->image_three));
    }

    if ($product->image_four && file_exists(public_path($product->image_four))) {
        unlink(public_path($product->image_four));
    }

    // Now delete the product record from the database
    $product->delete();

    // Redirect back with a success message
    return redirect()->back()->with('success', 'Product deleted successfully');
}


}