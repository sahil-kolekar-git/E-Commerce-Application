package com.ecom.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ecom.entity.Product;

@Service
public interface ProductService {

	Product uploadProduct(Product product, MultipartFile imageFile);

	List<Product> getProducts();

	Product getProduct(Integer id);

	Integer deleteProduct(Integer id);

	Product updateProduct(Integer id, Product product, MultipartFile imageFile) throws IOException;

}
