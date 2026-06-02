#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, String, symbol_short};

#[contract]
pub struct DemuseContract;

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Creator {
    pub name: String,
    pub total_tips: i128,
}

#[contractimpl]
impl DemuseContract {
    /// Register a new creator on the platform.
    pub fn register_creator(env: Env, creator: Address, name: String) {
        creator.require_auth();
        
        let key = creator.clone();
        if env.storage().persistent().has(&key) {
            panic!("Creator already registered");
        }
        
        let creator_data = Creator {
            name,
            total_tips: 0,
        };
        
        env.storage().persistent().set(&key, &creator_data);
        
        // Emit an event
        env.events().publish((symbol_short!("register"), creator), creator_data);
    }
    
    /// Tip a creator. Note: Real implementations would involve transferring token balances.
    /// This is simplified for logic validation.
    pub fn tip_creator(env: Env, tipper: Address, creator: Address, amount: i128) {
        tipper.require_auth();
        
        if amount <= 0 {
            panic!("Tip amount must be positive");
        }
        
        let key = creator.clone();
        let mut creator_data: Creator = env.storage().persistent().get(&key).unwrap_or_else(|| panic!("Creator not found"));
        
        creator_data.total_tips += amount;
        env.storage().persistent().set(&key, &creator_data);
        
        // Emit an event
        env.events().publish((symbol_short!("tip"), tipper, creator), amount);
    }
    
    /// Get details of a registered creator.
    pub fn get_creator(env: Env, creator: Address) -> Creator {
        let key = creator.clone();
        env.storage().persistent().get(&key).unwrap_or_else(|| panic!("Creator not found"))
    }
}
