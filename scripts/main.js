const mod = Vars.mods.locateMod("exp");
const subtitles = ["[#f25555]My Little Expansion[]","[#f25555]Anuke is a bad coder[]","[#f25555]Don't leave me alone...[]","[#f25555]Are ya winning son?[]","[#f25555]No, you can't[]","[#f25555]Ranai is real[]","[#f25555]Also try Tetrator![]"];
const random = subtitles[Math.floor(Math.random() * subtitles.length)];
mod.meta.subtitle = random;
const max = 2147483647
const terra = Vars.mods.locateMod("terra");

if (!terra) {
    Planets.tantros.alwaysUnlocked = true
    Planets.tantros.accessible = true
    Planets.tantros.visible = true
    Planets.tantros.atmosphereColor = Color.valueOf("143d33");
    Planets.tantros.ruleSetter = r => {
        r.waveTeam = Team.blue;
    };
    Planets.tantros.cloudMeshLoader = () => {
        const tanti = Planets.tantros;
        return new MultiMesh(
            new HexSkyMesh(tanti, 5, 0.15, 0.14, 5, Color.valueOf("96c0e3c2"), 2, 0.45, 0.9, 0.42),
            new HexSkyMesh(tanti, 8, 0.6, 0.15, 5, Color.valueOf("bcd7e6c2"), 2, 0.45, 1.1, 0.44)
        )
    };
    
    Planets.gier.alwaysUnlocked = true
    Planets.gier.accessible = true
    Planets.gier.drawOrbit = true
    Planets.gier.defaultCore = Blocks.coreAcropolis
    //Planets.gier.techTree = Planets.erekir.techTree
    Planets.gier.defaultEnv = Env.space | Env.terrestrial
    Planets.gier.clearSectorOnLose = true;
    Planets.gier.ruleSetter = r => {
        r.waveTeam = Team.malis;
    };
    
    Planets.notva.alwaysUnlocked = true
    Planets.notva.accessible = true
    Planets.notva.defaultCore = Blocks.coreAcropolis
    Planets.notva.techTree = Planets.gier.techTree
    Planets.notva.defaultEnv = Env.space | Env.terrestrial
    Planets.notva.clearSectorOnLose = true;
    Planets.notva.ruleSetter = r => {
        r.waveTeam = Team.malis;
    };
    
    Planets.verilus.alwaysUnlocked = true
    Planets.verilus.accessible = true
    Planets.verilus.defaultEnv = Env.space | Env.terrestrial
    Planets.verilus.clearSectorOnLose = true;
    
    /*Events.on(WorldLoadBeginEvent, () => {
        if(Vars.state.rules.sector == null) return;
    
        let sector = Vars.state.rules.sector;
        let planet = sector.planet;
    
        const targetPlanets = ["gier", "notva"];
        if(!targetPlanets.includes(planet.name)) return;
    
        let newSeed = Math.floor(Mathf.random(30000));
    
        planet.id = newSeed;
    
        Log.info("New ID applied to " + planet.name + ": " + planet.id);
    });*/
    
    StatusEffects.invincible.alwaysUnlocked = true
    StatusEffects.invincible.show = true

    const notCampaignOnly = new BuildVisibility(new Boolp({get: () => Vars.state == null || !Vars.state.isCampaign()}));

    Blocks.heatReactor.buildVisibility = notCampaignOnly
    Blocks.slagCentrifuge.buildVisibility = notCampaignOnly
    Blocks.shieldProjector.buildVisibility = notCampaignOnly
    Blocks.shieldProjector.requirements = ItemStack.with(Items.graphite, 6200, Items.thorium, 3000, Items.silicon, 5000, Items.phaseFabric, 3100, Items.surgeAlloy, 2200, Items.beryllium, 3800, Items.tungsten, 3800, Items.oxide, 2500, Items.carbide, 2200, Items.fissileMatter, 1200)
    Blocks.largeShieldProjector.buildVisibility = notCampaignOnly
    Blocks.largeShieldProjector.requirements = ItemStack.with(Items.graphite, 6200 * 3, Items.thorium, 3000 * 3, Items.silicon, 5000 * 3, Items.phaseFabric, 3100 * 3, Items.surgeAlloy, 2200 * 3, Items.beryllium, 3800 * 3, Items.tungsten, 3800 * 3, Items.oxide, 2500 * 3, Items.carbide, 2200 * 3, Items.fissileMatter, 1200 * 3)
    Blocks.launchPad.buildVisibility = notCampaignOnly
    Blocks.commandCenter.buildVisibility = notCampaignOnly
    Blocks.commandCenter.requirements = ItemStack.with(Items.copper, 10)
    Blocks.thruster.buildVisibility = notCampaignOnly
    //Blocks.powerNode.requirements = ItemStack.with(Items.graphite, 2, Items.lead, 6)

    Blocks.slag.supportsOverlay = true
    Blocks.tar.supportsOverlay = true
    Blocks.arkyciteFloor.supportsOverlay = true
    Blocks.bluemat.wall = Blocks.shaleWall
    Blocks.redmat.wall = Blocks.rhyoliteWall
    Blocks.redweed.breakSound = Sounds.plantBreak
    Blocks.purbush.breakSound = Sounds.plantBreak

    Items.dormantCyst.hidden = false
    Items.fissileMatter.hidden = false
    Liquids.gallium.hidden = false

    Weathers.suspendParticles.hidden = false

    UnitTypes.renale.hidden = false
    UnitTypes.latum.hidden = false
    UnitTypes.manifold.hidden = false
    UnitTypes.assemblyDrone.hidden = false
    Events.on(ClientLoadEvent, () => {
        ["anthicus-missile", "quell-missile", "disrupt-missile", "scathe-missile", "scathe-missile-surge", "scathe-missile-surge-split", "scathe-missile-phase"].forEach(id => {
            let unit = Vars.content.unit(id);
            if (unit) {unit.hidden = false;}
        });
    });
    
    UnitTypes.emanate.controller = u => u.team.isAI() ? new BuilderAI(true, 500) : new CommandAI();
    UnitTypes.incite.controller = u => u.team.isAI() ? new BuilderAI(true, 500) : new CommandAI();
    UnitTypes.evoke.controller = u => u.team.isAI() ? new BuilderAI(true, 500) : new CommandAI();
    
    Blocks.distributor.buildType = () => extend(Router.RouterBuild, Blocks.distributor, {
        canControl() {
            return true;
        }
    });
    
    Events.on(ClientLoadEvent, () => {
        const db = Vars.ui.database;
        var status = new Stat("expstatus", StatCat.function);
        var wind = new Stat("expwind", StatCat.function);
        var liquid = new Stat("expliquid", StatCat.function);
        var attrs = new Stat("expattrs", StatCat.function);
    
        Vars.content.getBy(ContentType.weather).each(w => {
            if (!w.uiIcon || !w.uiIcon.found()) w.uiIcon = Core.atlas.find("exp-weather-null");
            if (!w.fullIcon || !w.fullIcon.found()) w.fullIcon = Core.atlas.find("exp-weather-null");
    
            if (w.status && w.status != StatusEffects.none) {
                w.stats.add(status, extend(StatValue, {
                    display: function(t) {
                        t.image(w.status.uiIcon).size(20).padRight(2);
                        t.add(w.status.localizedName);
                    }
                }));
            }
            if (w instanceof ParticleWeather && w.force > 0) {
                w.stats.add(wind, w.force, StatUnit.tilesSecond);
            }
            
            if (w instanceof RainWeather && w.liquid != null) {
                w.stats.add(liquid, extend(StatValue, {
                    display: function(t) {
                        t.image(w.liquid.uiIcon).size(20).padRight(2);
                        t.add(w.liquid.localizedName);
                    }
                }));
            }
            
            var hasAttrs = false;
            for(var i = 0; i < Attribute.all.length; i++) {
                if(w.attrs.get(Attribute.all[i]) != 0) { hasAttrs = true; break; }
            }
    
            if(hasAttrs){
                w.stats.add(attrs, extend(StatValue, {
                    display: function(t) {
                        t.row(); 
                        
                        var inner = t.table().get();
                        inner.left().defaults().left().padLeft(10); 
                
                        var allAttrs = Attribute.all;
                        for(var i = 0; i < allAttrs.length; i++){
                            var attr = allAttrs[i];
                            var val = w.attrs.get(attr);
                            if(val == 0) continue;
                
                            let color = val > 0 ? "[stat]" : "[red]";
                            let sign = val > 0 ? "+" : "";
                            inner.add("[lightgray]- " + attr + ": " + color + sign + Math.round(val * 100) + "%").row();
                        }
                    }
                }));
            }
        });
    
        db.shown(run(() => {
            let scroll = db.cont.getChildren().get(1);
            let mainTable = scroll.getWidget();
    
            if(!mainTable) return;
    
            mainTable.update(run(() => {
                if(mainTable.find("exp-weather-section") != null) return;
    
                mainTable.row();
                mainTable.add(Core.bundle.get("rules.weather")).color(Pal.accent).left().padTop(0).name("exp-weather-section").row();
                mainTable.image(Tex.whiteui).color(Pal.accent).fillX().height(3).padTop(4).padBottom(10).row();
    
                mainTable.table(cons(list => {
                    list.left();
            
                    let cols = Math.floor(Math.max((Core.graphics.getWidth() - Scl.scl(30)) / Scl.scl(32 + 12), 1));
                    let count = 0;
            
                    Vars.content.each(cons(w => {
                        if(!(w instanceof Weather)) return;
    
                        let img = new Image(w.uiIcon);
                        img.setColor(Color.white);
                        img.setScaling(Scaling.fit);
    
                        let listener = new ClickListener();
                        img.addListener(listener);
                        img.addListener(new HandCursorListener());
                        
                        img.update(run(() => {
                            img.color.lerp(!listener.isOver() ? Color.lightGray : Color.white, Math.min(0.4 * Time.delta, 1));
                        }));
                        
                        img.clicked(run(() => Vars.ui.content.show(w)));
                        
                        img.addListener(new Tooltip(cons(t => {
                            t.background(Tex.button).add(w.localizedName + (Core.settings.getBool("console") ? "\n[gray]" + w.name : ""));
                        })));
                        
                        list.add(img).size(8 * 4).pad(3);
                        if(++count % cols == 0) list.row();
                    }));
                })).left().padBottom(30).row();
            }));
        }));
    });
}
