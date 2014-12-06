package org.marvellous.factory.component;

import java.util.ArrayList;

import utils.Point;

import com.badlogic.ashley.core.Component;
import com.badlogic.ashley.core.ComponentMapper;
import com.badlogic.gdx.utils.Pool.Poolable;

public class Shape extends Component implements Poolable {

    public static final ComponentMapper<Shape> mapper = ComponentMapper
	    .getFor(Shape.class);

    public static final int EMPTY = 0;
    public static final int FULL = 1;
    public static final int INPUT = 2;
    public static final int OUTPUT = 3;

    private int originX = 0, originY = 0;

    private int[][] shape;

    public int getOriginX() {
	return originX;
    }

    public void setOriginX(int xOrigin) {
	this.originX = xOrigin;
    }

    public int getOriginY() {
	return originY;
    }

    public void setOriginY(int yOrigin) {
	this.originY = yOrigin;
    }

    public int[][] getShape() {
	return shape;
    }

    public void setShape(int[][] shape) {
	this.shape = shape;
    }

    @Override
    public void reset() {
	originX = 0;
	originY = 0;
	shape = null;
    }
    
    private ArrayList<Point> scanCell(int symbol){
    	ArrayList<Point> cells = new ArrayList<Point>();
    	for( int x = shape.length; x>=0 ; x--)
        for( int y = shape[x].length; y>=0 ; y--)
        
        	if( shape[x][y] == symbol )
        		cells.add( new Point(x,y) );
        
        return cells;
    }
    
    public ArrayList<Point> getInputs(){
    	return scanCell( INPUT );
    }
    
    public ArrayList<Point> getOuputs(){
    	return scanCell( OUTPUT );
    }
}
