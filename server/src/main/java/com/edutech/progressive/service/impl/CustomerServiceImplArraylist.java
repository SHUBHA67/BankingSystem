package com.edutech.progressive.service.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.edutech.progressive.entity.Customers;
import com.edutech.progressive.service.CustomerService;

public class CustomerServiceImplArraylist implements CustomerService {

    private static List<Customers> customersList = new ArrayList<>();

    @Override
    public List<Customers> getAllCustomers() throws SQLException {
        // return new ArrayList<>(customersList);
        return customersList;
    }

    @Override
    public int addCustomer(Customers customers) throws SQLException {
        customersList.add(customers);
        return customersList.size();
    }

    @Override
    public List<Customers> getAllCustomersSortedByName() throws SQLException {
        List<Customers> sortedList = new ArrayList<>(customersList);
        Collections.sort(sortedList);
        return sortedList;
    }

    @Override
    public void emptyArrayList() {
        customersList = new ArrayList<>();
    }

    public Customers getCustomerById(int customerId) throws SQLException {
        for (Customers c : customersList) {
            if (c.getCustomerId() == customerId) return c;
        }
        return null;
    }
}
