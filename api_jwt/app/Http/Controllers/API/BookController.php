<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Book;
use Validator;

class BookController extends BaseController
{
    public function index(){
        $books=Book::all();
        return $this->sendResponse($books->toArray(),'Books read succesfully.');

    }
    public function store(Request $resquest){
       
        $input=$resquest->all();
        $validator= Validator::make($input,[
            'name' => 'required',
            'details'=>'required',
        ]);
        if($validator->fails()){
            return $this->sendError('error validation',$validator->errors());
        }
        $book=Book::create($input);
        return $this->sendResponse($book->toArray(),'Books created succesfully.');
    }
    public function show($id){
       
        $book=Book::find($id);

        if(is_null($book)){
            return $this->sendError('Book not found');
        }

        return $this->sendResponse($book->toArray(),'Books found succesfully.');
    }
    public function update(Request $resquest, Book $book){
       
        $input=$resquest->all();
        $validator= Validator::make($input,[
            'name' => 'required', 
            'details'=>'required',
        ]);
        if($validator->fails()){
            return $this->sendError('error validation',$validator->errors());
        }

        $book->name=$input['name'];
        $book->details=$input['details'];
        $book->save();

        return $this->sendResponse($book->toArray(),'Books update succesfully.');
    }
    public function destroy(Book $book){
       
        
        $book->delete();

        return $this->sendResponse($book->toArray(),'Books deleted succesfully.');
    }
}
