# Smart Contract Storage for hashes
import smartpy as sp

class HashStorage(sp.Contract):
    def __init__(self, admin):
        self.init(hStorage = sp.big_map(tvalue = sp.TBool) , admin = admin)

    @sp.entry_point
    def storeHash(self, params):
        sp.verify(sp.sender == self.data.admin , "Not Admin")
        sp.verify(~self.data.hStorage.contains(params), "Already Exist")
        self.data.hStorage[params] = True

if "templates" not in __name__:
    @sp.add_test(name = "HashStorage")
    def test():
        admin = sp.test_account("Administrator")
        c1 = HashStorage(admin.address)
        scenario = sp.test_scenario()
        scenario.h1("Hash Storage")
        scenario += c1
        scenario += c1.storeHash("hahah").run(sender = admin)
        scenario += c1.storeHash("hahah").run(sender = admin, valid = False)
        scenario += c1.storeHash("hahah").run(sender = sp.test_account("alice"), valid = False)
        scenario += c1.storeHash("123123").run(sender = admin)
