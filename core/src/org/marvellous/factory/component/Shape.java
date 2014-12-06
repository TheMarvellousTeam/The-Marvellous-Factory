package org.marvellous.factory.component;

import java.util.ArrayList;

import utils.Point;

import com.badlogic.ashley.core.Component;
import com.badlogic.gdx.utils.Pool.Poolable;

public class Shape extends Component implements Poolable {

    public static final int EMPTY = 0;
    public static final int FULL = 1;
    public static final int INPUT = 2;
    public static final int OUTPUT = 3;

    private int xOrigin = 0, yOrigin = 0;

    private int[][] shape;

    @Override
    public void reset() {
	xOrigin = 0;
	yOrigin = 0;
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
