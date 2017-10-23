package controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.StepDayDAO;
import entities.StepDay;

@RestController
public class StepDayController {
	
//	CRUD functionality
//	2 Reads
//	use the special method names (index, show, etc.)
//
	
	@Autowired
	private StepDayDAO dao;
	
	@RequestMapping(path="ping", method=RequestMethod.GET)
	public String ping() {
		return "pong";
	}
	
	//need mappings above each of these
	//the path uses the plural form of the class we are building the controller for
	
	//no params, just return all
	@RequestMapping(path="stepDays", method=RequestMethod.GET)
	public List<StepDay> index() {
		//get all of them
		return dao.getAll();
	}
	
	//needs the id
	@RequestMapping(path="stepDays/{id}", method=RequestMethod.GET)
	public StepDay show(@PathVariable int id) {
//		return one of them by id
		return dao.getStepDayByID(id);
	}
	
	//need the body of the request which has a JSON string to build an object with it
	@RequestMapping(path="stepDays", method=RequestMethod.POST)
	public StepDay create(@RequestBody String stepDayJSON) {
		
		return dao.createStepDay(stepDayJSON);
	}
	
	@RequestMapping(path="stepDays/{id}", method=RequestMethod.DELETE)
	public boolean destroy(@PathVariable int id) {
		
		return dao.deleteStepDay(id);
	}
	
//	need the body to get its JSON String to make an object, then use that object's data,
//	to update an object that already exists in the DB, so we need the existing object's id
	@RequestMapping(path="stepDays/{id}", method=RequestMethod.PUT)
	public StepDay update(@RequestBody String stepDayJSON, @PathVariable int id) {
		
		return dao.updateStepDay(stepDayJSON, id);
	}
	
	
	
	
	
	
	
}
