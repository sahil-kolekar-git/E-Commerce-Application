package com.ecom.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ecom.entity.Product;
import com.ecom.repository.ProductRepository;

@Service
public class ProductServiceImplementation implements ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Override
	public Product uploadProduct(Product product, MultipartFile imageFile) {

		try {
			product.setImageType(imageFile.getContentType());
			product.setImageName(imageFile.getOriginalFilename());
			product.setImageData(imageFile.getBytes());

			return productRepository.save(product);

		} catch (IOException e) {
			throw new RuntimeException("Something wrong with the image");
		}

	}

	@Override
	public List<Product> getProducts() {
		return productRepository.findAll();
	}

	@Override
	public Product getProduct(Integer id) {
		return productRepository.findById(id).get();

	}

	@Override
	public Integer deleteProduct(Integer id) {

		productRepository.deleteById(id);
		return id;

	}

}
