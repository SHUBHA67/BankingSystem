package com.edutech.progressive.service.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.edutech.progressive.entity.Customers;
import com.edutech.progressive.service.CustomerService;

public class CustomerServiceImplArraylist implements CustomerService {
    @Override
    public List<Customers> getAllCustomers() throws SQLException {
        return new ArrayList<>(); 
    }

    @Override
    public int addCustomer(Customers customers) throws SQLException {
        return -1; 
    }

    @Override
    public List<Customers> getAllCustomersSortedByName() throws SQLException {
        return new ArrayList<>(); 
    }

    @Override
    public void emptyArrayList() {
    }
}
