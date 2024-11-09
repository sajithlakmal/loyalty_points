package com.abc.company.Service;

import com.abc.company.Model.Customer;
import com.abc.company.Repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public Optional<Customer> getCustomerById(String id) {
        return customerRepository.findById(id);
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer updateCustomer(String id, Customer customerDetails) {
        return customerRepository.findById(id).map(customer -> {
            customer.setName(customerDetails.getName());
            customer.setEmail(customerDetails.getEmail());
            customer.setLoyaltyPoints(customerDetails.getLoyaltyPoints());
            return customerRepository.save(customer);
        }).orElseThrow(() -> new IllegalArgumentException("Customer not found with id: " + id));
    }

    public void deleteCustomer(String id) {
        customerRepository.deleteById(id);
    }

    public Customer addPoints(String id, int points) {
        return customerRepository.findById(id).map(customer -> {
            customer.setLoyaltyPoints(customer.getLoyaltyPoints() + points);
            return customerRepository.save(customer);
        }).orElseThrow(() -> new IllegalArgumentException("Customer not found with id: " + id));
    }

    public Customer redeemPoints(String id, int points) {
        return customerRepository.findById(id).map(customer -> {
            if (customer.getLoyaltyPoints() >= points) {
                customer.setLoyaltyPoints(customer.getLoyaltyPoints() - points);
                return customerRepository.save(customer);
            } else {
                throw new IllegalArgumentException("Insufficient loyalty points for customer with id: " + id);
            }
        }).orElseThrow(() -> new IllegalArgumentException("Customer not found with id: " + id));
    }
}