package com.ecom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ecom.entity.Product;
import com.ecom.service.ProductService;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:5173/")
public class ProductController {

	@Autowired
	private ProductService productService;

	@PostMapping("/upload")
	public ResponseEntity<Product> uploadProduct(@RequestPart Product product, @RequestPart MultipartFile imageFile) {

		return new ResponseEntity<>(productService.uploadProduct(product, imageFile), HttpStatus.CREATED);
	}

	@GetMapping("/products")
	public ResponseEntity<List<Product>> getAll() {
		return new ResponseEntity<List<Product>>(productService.getProducts(), HttpStatus.OK);
	}

	@GetMapping("/{id}/image")
	public ResponseEntity<byte[]> getImage(@PathVariable Integer id) {

		Product product = productService.getProduct(id);

		return ResponseEntity.ok().contentType(MediaType.valueOf(product.getImageType())).body(product.getImageData());
	}

}
