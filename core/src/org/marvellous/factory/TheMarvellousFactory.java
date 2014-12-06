package org.marvellous.factory;

import com.badlogic.ashley.core.PooledEngine;
import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;

public class TheMarvellousFactory extends ApplicationAdapter {
    private static final int POOL_ENTITY_INIT_SIZE = 10,
	    POOL_ENTITY_MAX_SIZE = 50, POOL_COMPONENT_INIT_SIZE = 10,
	    POOL_COMPONENT_MAX_SIZE = 50;

    SpriteBatch batch;

    PooledEngine engine;

    @Override
    public void create() {
	batch = new SpriteBatch();

	engine = new PooledEngine(POOL_ENTITY_INIT_SIZE, POOL_ENTITY_MAX_SIZE,
		POOL_COMPONENT_INIT_SIZE, POOL_COMPONENT_MAX_SIZE);

	Asset.load();
    }

    @Override
    public void render() {
	batch.begin();
	engine.update(Gdx.graphics.getDeltaTime());
	batch.end();
    }

    @Override
    public void dispose() {
	super.dispose();
	batch.dispose();

	Asset.dispose();
    }
}
