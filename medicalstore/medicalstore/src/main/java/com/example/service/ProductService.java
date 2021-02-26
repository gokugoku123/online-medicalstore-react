package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repository.ProductRepository;
import com.example.model.ProductModel;

@Service
public class ProductService {
	
	@Autowired
	public ProductRepository productRepo;
	
	public List<ProductModel> getAllProducts() {
		return productRepo.findAll();
	}
	
	public boolean addProduct(ProductModel product) {
		return productRepo.save(product) != null;
	}
	
	public ProductModel getProduct(String id) {
		
		Optional<ProductModel> product = productRepo.findById(id);
		if(product.isEmpty()) {
			return null;
		}
		return product.get();
	}
	
	public boolean editProduct(String productId, ProductModel product) {
		Optional<ProductModel> tempProduct = productRepo.findById(productId);
	   	 if(tempProduct.isEmpty())
	   		 return false;
	   	 else {
	   		 ProductModel temp = tempProduct.get();
	   		 temp.setProductName(product.getProductName());
	   		 temp.setPrice(product.getPrice());
	   		 temp.setImageUrl(product.getImageUrl());
	   		 temp.setDescription(product.getDescription());
	   		 temp.setQuantity(product.getQuantity());
	   		 return productRepo.save(temp) != null;
	   	 }
	}
		
	public boolean deleteProduct(String id) {
		try {
			productRepo.deleteById(id);
			return true;
		} catch(Exception e) {
			return false;
		}
	}
	
	
	
}
